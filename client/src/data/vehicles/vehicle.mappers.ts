// Mappers: convert pg_graphql (snake_case) responses into the application
// domain models defined in vehicle.types.ts. Centralizing this mapping keeps
// GraphQL concerns out of page components.

import { getImageUrl, IMAGE_PROFILES } from "../images/imageUrl";
import { STATUS_TONE, STATUS_LABELS } from "./vehicle.types";
import type {
  Vehicle,
  VehicleImage,
  VehicleGalleryImage,
  VehicleStatus,
  VehicleFilters,
  VehicleSort,
} from "./vehicle.types";

export interface DbVehicleImage {
  id: string;
  vehicle_id: string;
  object_key: string;
  public_url: string | null;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface DbVehicle {
  id: string;
  stock_number: string;
  make: string;
  model: string;
  variant: string | null;
  year: number;
  price_kes: number | string;
  mileage_km: number | null;
  transmission: string | null;
  fuel_type: string | null;
  body_type: string | null;
  colour: string | null;
  engine_capacity: string | null;
  seats: number | null;
  doors: number | null;
  description: string | null;
  location: string | null;
  status: string;
  featured: boolean;
  published: boolean;
  features: string[] | null;
  verification: string[] | null;
  specs: Record<string, string> | null;
  rating: number | null;
  seller: string | null;
  segment: string | null;
  monthly_payment_kes: number | string | null;
  created_at: string;
  updated_at: string;
}

export function mapDbVehicleImage(row: DbVehicleImage): VehicleImage {
  return {
    id: row.id,
    vehicleId: row.vehicle_id,
    objectKey: row.object_key,
    publicUrl: row.public_url ?? "",
    altText: row.alt_text ?? "",
    sortOrder: row.sort_order ?? 0,
    isPrimary: !!row.is_primary,
    createdAt: row.created_at,
  };
}

function safeStatus(status: string): VehicleStatus {
  return (status as VehicleStatus) ?? "available";
}

export function statusToneFor(status: VehicleStatus) {
  return STATUS_TONE[status];
}

function deliveryUrl(
  objectKey: string | null | undefined,
  profile: keyof typeof IMAGE_PROFILES
): string {
  if (!objectKey) return getImageUrl("", profile);
  return getImageUrl(objectKey, profile);
}

export function mapDbVehicle(
  row: DbVehicle,
  images: VehicleImage[] = []
): Vehicle {
  const status = safeStatus(row.status);
  const price = Number(row.price_kes);
  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  const primary = sorted.find(img => img.isPrimary) ?? sorted[0];

  const image: string = primary
    ? deliveryUrl(primary.objectKey, "vehicle-card")
    : "";

  const gallery: VehicleGalleryImage[] = sorted.map(img => ({
    src: deliveryUrl(img.objectKey, "vehicle-gallery-thumb"),
    label: img.altText || "",
  }));

  const monthly =
    row.monthly_payment_kes != null
      ? Number(row.monthly_payment_kes)
      : Math.round(price * 0.0203);

  return {
    id: row.id,
    stockNo: row.stock_number,
    make: row.make,
    model: row.model,
    variant: row.variant ?? "",
    year: row.year,
    price,
    mileage: row.mileage_km ?? 0,
    engine: row.engine_capacity ?? "",
    fuel: row.fuel_type ?? "",
    transmission: row.transmission ?? "",
    body: row.body_type ?? "",
    location: row.location ?? "",
    status,
    statusTone: statusToneFor(status),
    color: row.colour ?? "",
    image,
    gallery,
    description: row.description ?? "",
    features: row.features ?? [],
    verification: row.verification ?? [],
    specs: row.specs ?? {},
    updated: row.updated_at,
    seller: row.seller ?? "",
    segment: row.segment ?? "",
    rating: row.rating ?? 0,
    featured: !!row.featured,
    published: !!row.published,
    monthly,
    images: sorted,
  };
}

export function labelForStatus(status: VehicleStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export type VehicleWhere = Record<string, unknown>;
export type VehicleOrder = Record<string, unknown>;

// Build a pg_graphql `vehicles_bool_exp` from UI filters. All filtering is
// pushed to the database; nothing here fetches the whole catalogue.
export function buildVehicleWhere(filters: VehicleFilters): VehicleWhere {
  const and: VehicleWhere[] = [];
  if (filters.search) {
    const q = `%${filters.search}%`;
    and.push({
      _or: [
        { make: { ilike: q } },
        { model: { ilike: q } },
        { stock_number: { ilike: q } },
      ],
    });
  }
  if (filters.make && filters.make !== "All makes")
    and.push({ make: { eq: filters.make } });
  if (filters.model && filters.model !== "All models")
    and.push({ model: { eq: filters.model } });
  if (filters.body && filters.body !== "All body types")
    and.push({ body_type: { eq: filters.body } });
  if (filters.status && filters.status !== "All status")
    and.push({ status: { eq: filters.status } });
  if (filters.fuel) and.push({ fuel_type: { eq: filters.fuel } });
  if (filters.transmission)
    and.push({ transmission: { eq: filters.transmission } });
  if (filters.year && filters.year !== "All years")
    and.push({ year: { eq: Number(filters.year) } });
  if (filters.featured === true) and.push({ featured: { eq: true } });
  if (filters.published === true) and.push({ published: { eq: true } });
  if (filters.minPrice != null)
    and.push({ price_kes: { gte: filters.minPrice } });
  if (filters.maxPrice != null)
    and.push({ price_kes: { lte: filters.maxPrice } });

  if (and.length === 0) return {};
  return { _and: and };
}

const ORDER_MAP: Record<VehicleSort, VehicleOrder[]> = {
  "year-desc": [{ year: "desc" }, { price_kes: "desc" }],
  "year-asc": [{ year: "asc" }, { price_kes: "asc" }],
  "price-asc": [{ price_kes: "asc" }, { year: "desc" }],
  "price-desc": [{ price_kes: "desc" }, { year: "desc" }],
  "mileage-asc": [{ mileage_km: "asc" }, { price_kes: "asc" }],
  "name-asc": [{ make: "asc" }, { model: "asc" }],
};

export function buildVehicleOrder(
  sort: VehicleSort = "year-desc"
): VehicleOrder[] {
  return ORDER_MAP[sort] ?? ORDER_MAP["year-desc"];
}

// ----- URL filter serialization (for deep-linkable inventory filters) -----
export interface SerializedFilters {
  q?: string;
  make?: string;
  model?: string;
  body?: string;
  status?: string;
  fuel?: string;
  transmission?: string;
  year?: string;
  min?: string;
  max?: string;
  sort?: string;
  featured?: string;
  price?: string;
}

export function serializeFilters(filters: VehicleFilters): SerializedFilters {
  const out: SerializedFilters = {};
  if (filters.search) out.q = filters.search;
  if (filters.make && filters.make !== "All makes") out.make = filters.make;
  if (filters.model && filters.model !== "All models")
    out.model = filters.model;
  if (filters.body && filters.body !== "All body types")
    out.body = filters.body;
  if (filters.status && filters.status !== "All status")
    out.status = filters.status;
  if (filters.fuel) out.fuel = filters.fuel;
  if (filters.transmission) out.transmission = filters.transmission;
  if (filters.year && filters.year !== "All years") out.year = filters.year;
  if (filters.minPrice != null) out.min = String(filters.minPrice);
  if (filters.maxPrice != null) out.max = String(filters.maxPrice);
  if (filters.sort) out.sort = filters.sort;
  if (filters.featured === true) out.featured = "true";
  if (filters.published === true) out.price = "published"; // reserved marker; see parse
  return out;
}

export function parseFilters(
  params: Record<string, string | null | undefined>
): VehicleFilters {
  const get = (k: string): string | undefined => {
    const v = params[k];
    return v == null ? undefined : String(v);
  };
  const min = get("min");
  const max = get("max");
  const sort = (get("sort") as VehicleSort | undefined) ?? "year-desc";
  return {
    search: get("q"),
    make: get("make"),
    model: get("model"),
    body: get("body"),
    status: get("status"),
    fuel: get("fuel"),
    transmission: get("transmission"),
    year: get("year"),
    minPrice: min != null ? Number(min) : undefined,
    maxPrice: max != null ? Number(max) : undefined,
    sort,
    featured: get("featured") === "true" ? true : undefined,
  };
}
