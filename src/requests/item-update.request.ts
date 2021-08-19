import { JsonSerializer, JsonType } from "../json-util";
import { ItemType } from "../models/item";

export interface ItemUpdateFields {
  taxRateId?: number;
  type?: ItemType;
  enabled?: boolean;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  alcohol?: boolean;
}

export class ItemUpdateRequest implements JsonSerializer {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly fields: ItemUpdateFields
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      tax_rate_id: this.fields.taxRateId,
      type: this.fields.type,
      enabled: this.fields.enabled,
      name: this.fields.name,
      description: this.fields.description,
      image_url: this.fields.imageUrl,
      price: this.fields.price,
      alcohol: this.fields.alcohol,
    };
  }
}
