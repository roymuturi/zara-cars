// GraphQL query documents. All filtering, sorting, and pagination happen
// server-side via pg_graphql `where`/`order`/`limit`/`offset`. The browser
// never fetches the whole catalogue to filter client-side.
import { VEHICLE_FIELDS, VEHICLE_IMAGE_FIELDS } from "./fragments";

export const VEHICLES_QUERY = `
  query Vehicles($where: vehicles_bool_exp, $order: [vehicles_order_by!], $limit: Int!, $offset: Int!) {
    vehicles(where: $where, order: $order, limit: $limit, offset: $offset) {
      ${VEHICLE_FIELDS}
    }
  }
`;

export const VEHICLE_BY_ID_QUERY = `
  query VehicleById($id: UUID!) {
    vehicles(where: { id: { eq: $id } }, limit: 1) {
      ${VEHICLE_FIELDS}
    }
  }
`;

export const VEHICLE_IMAGES_QUERY = `
  query VehicleImages($where: vehicle_images_bool_exp) {
    vehicle_images(where: $where) {
      ${VEHICLE_IMAGE_FIELDS}
    }
  }
`;

export const VEHICLE_MAKES_QUERY = `
  query VehicleMakes {
    vehicles {
      make
    }
  }
`;
