import { JsonType } from "../json-util";

export interface LocationUpdateRequest {
  id: number;

  companyId?: number;
  name?: string;
  address?: string;
}

export function locationUpdateRequestToJson(
  r: LocationUpdateRequest
): JsonType {
  return {
    id: r.id,
    company_id: r.companyId,
    name: r.name,
    address: r.address,
  };
}
