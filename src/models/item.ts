import { Model } from "./model";
import { JsonType } from "../json-type";

export class Item extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJSON(data: string | JsonType): Item {
    if (typeof data === "string") {
      data = JSON.parse(data) as JsonType;
    }
    return new Item(
      typeof data["id"] === "number" ? data["id"] : 0,
      typeof data["created_at"] === "string"
        ? new Date(data["created_at"])
        : new Date(),
      new Date()
    );
  }
}
