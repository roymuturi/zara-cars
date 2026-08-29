// Domain types for the Zara Cars data layer.
//
// These are the single source of truth for vehicle data shapes consumed by the
// UI. The database uses snake_case (see supabase/migrations); the GraphQL mapper
// in vehicle.mappers.ts converts Supabase/pg_graphql responses into these
// camelCase application models. No page component constructs raw GraphQL.

export type VehicleStatus =
  | "available"
  | "duty_paid"
  | "reserved"
  | "in_transit"
  | "clearing"
  | "sold"
  | "draft";

export const VEHICLE_STATUSES: readonly VehicleStatus[] = [
  "available",
  "duty_paid",
  "reserved",
  "in_transit",
  "clearing",
  "sold",
  "draft",
];

// User-facing label for each controlled status.
export const STATUS_LABELS: Record<VehicleStatus, string> = {
  available: "Ready to view",
  duty_paid: "Duty paid",
  reserved: "Reserved",
  in_transit: "In transit",
  clearing: "Clearing",
  sold: "Sold",
  draft: "Draft",
};

// Tone key used by StatusPill / StatusBadge for color mapping.
export type StatusTone = "green" | "blue" | "amber" | "slate" | "red";

export const STATUS_TONE: Record<VehicleStatus, StatusTone> = {
  available: "green",
  duty_paid: "blue",
  reserved: "slate",
  in_transit: "amber",
  clearing: "blue",
  sold: "red",
  draft: "slate",
};

export const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"] as const;
export const TRANSMISSIONS = ["Automatic", "Manual", "CVT"] as const;
export const BODY_TYPES = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Pickup",
  "Wagon",
  "MPV",
] as const;

export interface VehicleImage {
  id: string;
  vehicleId: string;
  objectKey: string;
  publicUrl: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface VehicleGalleryImage {
  src: string;
  label: string;
}

export interface Vehicle {
  id: string;
  stockNo: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  fuel: string;
  transmission: string;
  body: string;
  location: string;
  status: VehicleStatus;
  statusTone: StatusTone;
  color: string;
  image: string;
  gallery: VehicleGalleryImage[];
  description: string;
  features: string[];
  verification: string[];
  specs: Record<string, string>;
  updated: string;
  seller: string;
  segment: string;
  rating: number;
  featured: boolean;
  published: boolean;
  monthly: number;
  images: VehicleImage[];
}

export type VehicleSort =
  | "year-desc"
  | "year-asc"
  | "price-asc"
  | "price-desc"
  | "mileage-asc"
  | "name-asc";

export interface VehicleFilters {
  search?: string;
  make?: string;
  model?: string;
  body?: string;
  status?: string;
  fuel?: string;
  transmission?: string;
  year?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  published?: boolean;
  limit?: number;
  offset?: number;
  sort?: VehicleSort;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface InventoryQuery {
  filters: VehicleFilters;
  pagination: Pagination;
  sort: VehicleSort;
}
