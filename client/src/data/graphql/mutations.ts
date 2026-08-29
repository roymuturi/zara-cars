// GraphQL mutation documents (dealer write path).
// Dealer authorization is enforced at the data layer via RLS; the client only
// sends a Bearer access token from the authenticated dealer session.
export const INSERT_VEHICLE = `
  mutation InsertVehicle($objects: [vehicles_insert_input!]!) {
    insertIntovehicles(objects: $objects) {
      ... on vehicles { id stock_number make model }
    }
  }
`;

export const UPDATE_VEHICLE = `
  mutation UpdateVehicle($where: vehicles_bool_exp, $set: vehicles_set_input) {
    updatevehicles(where: $where, set: $set) {
      ... on vehicles { id }
    }
  }
`;

export const DELETE_VEHICLE = `
  mutation DeleteVehicle($where: vehicles_bool_exp) {
    deletefromvehicles(where: $where) {
      ... on vehicles { id }
    }
  }
`;

export const INSERT_VEHICLE_IMAGES = `
  mutation InsertVehicleImages($objects: [vehicle_images_insert_input!]!) {
    insertIntovehicle_images(objects: $objects) {
      ... on vehicle_images { id }
    }
  }
`;

export const UPDATE_VEHICLE_IMAGES = `
  mutation UpdateVehicleImages($where: vehicle_images_bool_exp, $set: vehicle_images_set_input) {
    updatevehicle_images(where: $where, set: $set) {
      ... on vehicle_images { id }
    }
  }
`;
