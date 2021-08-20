import { JsonType } from "../json-util";

export interface PaymentTenderCreateRequest {
  locationId: number;

  name?: string;
}

export function paymentTenderCreateRequestToJson(
  r: PaymentTenderCreateRequest
): JsonType {
  return {
    location_id: r.locationId,
    name: r.name,
  };
}
