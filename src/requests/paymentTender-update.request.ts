import { JsonType } from "../json-util";

export interface PaymentTenderUpdateRequest {
  id: number;
  locationId: number;

  name?: string;
}

export function paymentTenderUpdateRequestToJson(
  r: PaymentTenderUpdateRequest
): JsonType {
  return {
    id: r.id,
    location_id: r.locationId,
    name: r.name,
  };
}
