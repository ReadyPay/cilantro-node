import { JsonSerializer, JsonType } from "../json-util";
import { ItemType } from "../models/item";

export class ItemCreateRequest implements JsonSerializer {
  constructor(
    public locationId: number,
    public taxRateId: number,
    public type: ItemType,

    public enabled?: boolean,
    public name?: string,
    public description?: string,
    public imageUrl?: string,
    public price?: number,
    public alcohol?: boolean
  ) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      tax_rate_id: this.taxRateId,
      type: this.type,
      enabled: this.enabled,
      name: this.name,
      description: this.description,
      image_url: this.imageUrl,
      price: this.price,
      alcohol: this.alcohol,
    };
  }
}
