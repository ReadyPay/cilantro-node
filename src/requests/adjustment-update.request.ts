import { JsonType } from "../json-util";

export interface AdjustmentUpdateRequest {
  id: number;
  locationId: number;

  value?: number;
}

export function adjustmentUpdateRequestToJson(
  r: AdjustmentUpdateRequest
): JsonType {
  return {
    id: r.id,
    location_id: r.locationId,
    value: r.value,
  };
}
