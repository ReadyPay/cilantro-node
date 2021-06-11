import { Model } from "./model";

export class Item extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJSON(data: string): Item {
    const json: { [k: string]: unknown } = JSON.parse(data);
    return new Item(
      typeof json["id"] === "number" ? json["id"] : 0,
      typeof json["created_at"] === "string"
        ? new Date(json["created_at"])
        : new Date(),
      new Date()
    );
  }
}
