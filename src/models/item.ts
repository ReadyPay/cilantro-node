import { Model } from "./model";
import {
  extractBool,
  extractDate,
  extractEnum,
  extractNullDate,
  extractNumber,
  extractString,
  JsonType,
} from "../json-util";

export class Item extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date | null,
    readonly locationId: number,
    readonly enabled: boolean,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly price: number,
    readonly taxRateId: number,
    readonly type: ItemType,
    readonly alcohol: boolean
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJSON(d: string | JsonType): Item {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Item(
      extractNumber(d, "id"),
      extractDate(d, "created_at"),
      extractNullDate(d, "updated_at"),
      extractNumber(d, "location_id"),
      extractBool(d, "enabled"),
      extractString(d, "name"),
      extractString(d, "description"),
      extractString(d, "image_url"),
      extractNumber(d, "price"),
      extractNumber(d, "tax_rate_id"),
      extractEnum(d, "type", ItemType, ItemType.Item),
      extractBool(d, "alcohol")
    );
  }
}

export enum ItemType {
  Item = "item",
  Modifier = "modifier",
}
