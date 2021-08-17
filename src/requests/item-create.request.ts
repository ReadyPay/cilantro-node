import { JsonSerializer, JsonType } from "../json-util";
import { ItemType } from "../models/item";

export class ItemCreateRequest implements JsonSerializer {
  constructor(
    readonly locationId: number,
    readonly taxRateId: number,
    readonly type: ItemType,

    readonly enabled?: boolean,
    readonly name?: string,
    readonly description?: string,
    readonly imageUrl?: string,
    readonly price?: number,
    readonly alcohol?: boolean
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
