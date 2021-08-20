import { JsonType } from "../json-util";

export interface AdjustmentCreateRequest {
  locationId: number;

  value?: number;
}

export function adjustmentCreateRequestToJson(
  r: AdjustmentCreateRequest
): JsonType {
  return {
    location_id: r.locationId,
    value: r.value,
  };
}
