// Public data-access layer for vehicles.
//
// Pages/components call getVehicles/getFeaturedVehicles/getVehicleById/
// getVehicleMakes instead of importing a hard-coded catalogue. All filtering,
// sorting, and pagination happen server-side via Supabase pg_graphql; images are
// joined in the mapper from a second query so the browser never receives the
// full catalogue unfiltered.

import { graphql } from "../graphql/client";
import {
  VEHICLES_QUERY,
  VEHICLE_BY_ID_QUERY,
  VEHICLE_IMAGES_QUERY,
  VEHICLE_MAKES_QUERY,
} from "../graphql/queries";
import type { DbVehicle, DbVehicleImage } from "./vehicle.mappers";
import {
  mapDbVehicle,
  mapDbVehicleImage,
  buildVehicleWhere,
  buildVehicleOrder,
  parseFilters,
  serializeFilters,
} from "./vehicle.mappers";
import type {
  Vehicle,
  VehicleImage,
  VehicleFilters,
  VehicleSort,
} from "./vehicle.types";

export interface InventoryResult {
  vehicles: Vehicle[];
  total: number;
}

export async function getVehicles(
  filters: VehicleFilters = {}
): Promise<InventoryResult> {
  const where = buildVehicleWhere(filters);
  const order = buildVehicleOrder(filters.sort ?? "year-desc");
  const limit = filters.limit ?? 24;
  const offset = filters.offset ?? 0;

  const data = await graphql<{ vehicles: DbVehicle[] }>({
    query: VEHICLES_QUERY,
    variables: { where, order, limit, offset },
  });
  const rows = data.vehicles ?? [];

  const images = await fetchImagesFor(rows.map(r => r.id));

  return {
    vehicles: rows.map(r =>
      mapDbVehicle(r, imagesByVehicle(images)[r.id] ?? [])
    ),
    total: rows.length,
  };
}

export async function getFeaturedVehicles(limit = 4): Promise<Vehicle[]> {
  return getVehicles({ featured: true, published: true, limit }).then(
    result => result.vehicles
  );
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const data = await graphql<{ vehicles: DbVehicle[] }>({
    query: VEHICLE_BY_ID_QUERY,
    variables: { id },
  });
  const row = data.vehicles?.[0];
  if (!row) return null;

  const images = await fetchImagesFor([row.id], "all");
  return mapDbVehicle(row, imagesByVehicle(images)[row.id] ?? []);
}

export async function getVehicleMakes(): Promise<string[]> {
  const data = await graphql<{ vehicles: Array<{ make: string }> }>({
    query: VEHICLE_MAKES_QUERY,
  });
  const seen = new Set<string>();
  for (const row of data.vehicles ?? []) {
    if (row.make) seen.add(row.make);
  }
  return Array.from(seen).sort();
}

// Fetch images for a set of vehicles. When scope === "primary" only primary
// images are returned (used by listing cards); "all" returns every image
// (used by vehicle detail).
async function fetchImagesFor(
  vehicleIds: string[],
  scope: "primary" | "all" = "primary"
): Promise<VehicleImage[]> {
  if (vehicleIds.length === 0) return [];
  const where: Record<string, unknown> = {
    vehicle_id: { in: vehicleIds },
  };
  if (scope === "primary") {
    where.is_primary = { eq: true };
  }
  const data = await graphql<{ vehicle_images: DbVehicleImage[] }>({
    query: VEHICLE_IMAGES_QUERY,
    variables: { where },
  });
  return (data.vehicle_images ?? []).map(mapDbVehicleImage);
}

function imagesByVehicle(
  images: VehicleImage[]
): Record<string, VehicleImage[]> {
  const by: Record<string, VehicleImage[]> = {};
  for (const img of images) {
    (by[img.vehicleId] ??= []).push(img);
  }
  return by;
}

export { parseFilters, serializeFilters };
export type { Vehicle, VehicleSort };
