import {
  mapDbVehicle,
  mapDbVehicleImage,
  buildVehicleWhere,
  buildVehicleOrder,
  serializeFilters,
  parseFilters,
  statusToneFor,
  labelForStatus,
} from "@/data/vehicles/vehicle.mappers";
import type {
  DbVehicle,
  DbVehicleImage,
} from "@/data/vehicles/vehicle.mappers";
import { STATUS_TONE, STATUS_LABELS } from "@/data/vehicles/vehicle.types";

const dbImage = (overrides: Partial<DbVehicleImage> = {}): DbVehicleImage => ({
  id: "img-1",
  vehicle_id: "veh-1",
  object_key: "vehicles/veh-1/01.webp",
  public_url: "https://example.com/vehicles/veh-1/01.webp",
  alt_text: "Front three-quarter",
  sort_order: 0,
  is_primary: true,
  created_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

const dbVehicle = (overrides: Partial<DbVehicle> = {}): DbVehicle => ({
  id: "veh-1",
  stock_number: "ZC-0194",
  make: "Toyota",
  model: "Harrier",
  variant: "Premium Advanced",
  year: 2019,
  price_kes: 3865000,
  mileage_km: 80000,
  transmission: "Automatic",
  fuel_type: "Hybrid",
  body_type: "SUV",
  colour: "Pearl white",
  engine_capacity: "2.0L",
  seats: 5,
  doors: 5,
  description: "A verified Harrier.",
  location: "Lavington, Nairobi",
  status: "available",
  featured: true,
  published: true,
  features: ["Leather seats"],
  verification: ["Duty paid and verified"],
  specs: { Drive: "AWD" },
  rating: 4,
  seller: "Amina Wanjiku",
  segment: "Executive SUV",
  monthly_payment_kes: 78500,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-08-01T00:00:00Z",
  ...overrides,
});

describe("mapDbVehicleImage", () => {
  it("converts snake_case row to camelCase domain", () => {
    const mapped = mapDbVehicleImage(dbImage());
    expect(mapped.vehicleId).toBe("veh-1");
    expect(mapped.objectKey).toBe("vehicles/veh-1/01.webp");
    expect(mapped.isPrimary).toBe(true);
    expect(mapped.altText).toBe("Front three-quarter");
  });
});

describe("mapDbVehicle", () => {
  it("maps a vehicle with its primary image", () => {
    const vehicle = mapDbVehicle(dbVehicle(), [mapDbVehicleImage(dbImage())]);
    expect(vehicle.stockNo).toBe("ZC-0194");
    expect(vehicle.price).toBe(3865000);
    expect(vehicle.monthly).toBe(78500);
    expect(vehicle.statusTone).toBe(STATUS_TONE.available);
    expect(vehicle.status).toBe("available");
    expect(vehicle.gallery[0].label).toBe("Front three-quarter");
    expect(vehicle.images[0].isPrimary).toBe(true);
  });

  it("derives monthly payment when not stored", () => {
    const vehicle = mapDbVehicle(dbVehicle({ monthly_payment_kes: null }), []);
    expect(vehicle.monthly).toBe(Math.round(3865000 * 0.0203));
  });

  it("falls back to first image when no primary", () => {
    const vehicle = mapDbVehicle(dbVehicle(), [
      mapDbVehicleImage(dbImage({ is_primary: false, sort_order: 0 })),
    ]);
    expect(vehicle.image).not.toBe("");
  });
});

describe("status helpers", () => {
  it("maps every status to a tone", () => {
    for (const status of Object.keys(STATUS_LABELS)) {
      expect(statusToneFor(status as keyof typeof STATUS_LABELS)).toBeTruthy();
    }
  });

  it("labels a sold vehicle", () => {
    expect(labelForStatus("sold")).toBe("Sold");
    expect(labelForStatus("duty_paid")).toBe("Duty paid");
  });
});

describe("buildVehicleWhere", () => {
  it("builds an empty object when no filters", () => {
    expect(buildVehicleWhere({})).toEqual({});
  });

  it("combines equality and range filters", () => {
    const where = buildVehicleWhere({
      make: "Toyota",
      body: "SUV",
      minPrice: 1000000,
      maxPrice: 5000000,
    });
    expect(where).toEqual({
      _and: [
        { make: { eq: "Toyota" } },
        { body_type: { eq: "SUV" } },
        { price_kes: { gte: 1000000 } },
        { price_kes: { lte: 5000000 } },
      ],
    });
  });

  it("builds a search OR clause", () => {
    const where = buildVehicleWhere({ search: "harrier" });
    expect(where).toEqual({
      _and: [
        {
          _or: [
            { make: { ilike: "%harrier%" } },
            { model: { ilike: "%harrier%" } },
            { stock_number: { ilike: "%harrier%" } },
          ],
        },
      ],
    });
  });
});

describe("buildVehicleOrder", () => {
  it("defaults to year-desc", () => {
    expect(buildVehicleOrder()).toEqual([
      { year: "desc" },
      { price_kes: "desc" },
    ]);
  });

  it("maps price-asc", () => {
    expect(buildVehicleOrder("price-asc")).toEqual([
      { price_kes: "asc" },
      { year: "desc" },
    ]);
  });
});

describe("filter serialization", () => {
  it("round-trips filters through the URL shape and back", () => {
    const filters = {
      search: "harrier",
      make: "Toyota",
      body: "SUV",
      minPrice: 1000000,
      maxPrice: 5000000,
      sort: "price-asc" as const,
      featured: true,
    };
    const serialized = serializeFilters(filters);
    const parsed = parseFilters(
      Object.fromEntries(
        Object.entries(serialized).map(([k, v]) => [k, v ?? null])
      )
    );
    expect(parsed.make).toBe("Toyota");
    expect(parsed.search).toBe("harrier");
    expect(parsed.body).toBe("SUV");
    expect(parsed.minPrice).toBe(1000000);
    expect(parsed.maxPrice).toBe(5000000);
    expect(parsed.sort).toBe("price-asc");
    expect(parsed.featured).toBe(true);
  });
});
