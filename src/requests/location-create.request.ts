import { JsonType } from "../json-util";

export interface LocationCreateRequest {
  companyId?: number;
  name?: string;
  address?: string;
}

export function locationCreateRequestToJson(
  r: LocationCreateRequest
): JsonType {
  return {
    company_id: r.companyId,
    name: r.name,
    address: r.address,
  };
}
