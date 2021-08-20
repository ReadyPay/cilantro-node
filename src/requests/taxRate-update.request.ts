import { JsonType } from "../json-util";

export interface TaxRateUpdateRequest {
  id: number;
  locationId: number;

  name?: string;
  rate?: number;
}

export function taxRateUpdateRequestToJson(r: TaxRateUpdateRequest): JsonType {
  return {
    id: r.id,
    location_id: r.locationId,
    name: r.name,
    rate: r.rate,
  };
}
