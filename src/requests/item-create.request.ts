import { JsonType } from "../json-util";
import { ItemType } from "../models/item";

export interface ItemCreateRequest {
  locationId: number;
  taxRateId: number;
  // TODO make optional
  type: ItemType;

  enabled?: boolean;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  alcohol?: boolean;
}

export function itemCreateRequestToJson(r: ItemCreateRequest): JsonType {
  return {
    location_id: r.locationId,
    tax_rate_id: r.taxRateId,
    type: r.type,
    enabled: r.enabled,
    name: r.name,
    description: r.description,
    image_url: r.imageUrl,
    price: r.price,
    alcohol: r.alcohol,
  };
}
