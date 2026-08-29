// Reusable GraphQL field selections for pg_graphql.
// pg_graphql exposes table rows directly (no nested field-name guessing at
// query time); images are fetched as a separate top-level query and joined in
// the mapper to stay robust to pg_graphql naming changes.

export const VEHICLE_IMAGE_FIELDS = `
  id
  vehicle_id
  object_key
  public_url
  alt_text
  sort_order
  is_primary
  created_at
`;

export const VEHICLE_FIELDS = `
  id
  stock_number
  make
  model
  variant
  year
  price_kes
  mileage_km
  transmission
  fuel_type
  body_type
  colour
  engine_capacity
  seats
  doors
  description
  location
  status
  featured
  published
  features
  verification
  specs
  rating
  seller
  segment
  monthly_payment_kes
  created_at
  updated_at
`;
