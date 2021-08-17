import { Model } from "./model";
import {
  extractBool,
  extractEnum,
  extractNullableNestedModel,
  extractNumber,
  extractString,
  JsonType,
} from "../json-util";
import { TaxRate } from "./taxRate";

export class Item extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly locationId: number,
    readonly enabled: boolean,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly price: number,
    readonly taxRateId: number,
    readonly type: ItemType,
    readonly alcohol: boolean,
    readonly taxRate: TaxRate | null
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJson(d: string | JsonType): Item {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Item(
      ...Model.extractPropsfromJson(d),
      extractNumber(d, "location_id"),
      extractBool(d, "enabled"),
      extractString(d, "name"),
      extractString(d, "description"),
      extractString(d, "image_url"),
      extractNumber(d, "price"),
      extractNumber(d, "tax_rate_id"),
      extractEnum(d, "type", ItemType, ItemType.Item),
      extractBool(d, "alcohol"),
      extractNullableNestedModel(d, "tax_rate", TaxRate)
    );
  }
}

export enum ItemType {
  Item = "item",
  Modifier = "modifier",
}
