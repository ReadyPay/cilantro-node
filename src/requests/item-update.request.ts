import { JsonType } from "../json-util";
import { ItemType } from "../models/item";

export interface ItemUpdateRequest {
  id: number;
  locationId: number;

  taxRateId?: number;
  type?: ItemType;
  enabled?: boolean;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  alcohol?: boolean;
}

export function itemUpdateRequestToJson(r: ItemUpdateRequest): JsonType {
  return {
    id: r.id,
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
