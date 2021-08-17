import { Model } from "./model";
import { extractString, JsonType } from "../json-util";

export class Location extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly name: string,
    readonly address: string
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJson(d: string | JsonType): Location {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Location(
      ...Model.extractPropsfromJson(d),
      extractString(d, "name"),
      extractString(d, "address")
    );
  }
}
