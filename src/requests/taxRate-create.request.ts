import { JsonType } from "../json-util";

export interface TaxRateCreateRequest {
  locationId: number;

  name?: string;
  rate?: number;
}

export function taxRateCreateRequestToJson(r: TaxRateCreateRequest): JsonType {
  return {
    location_id: r.locationId,
    name: r.name,
    rate: r.rate,
  };
}
