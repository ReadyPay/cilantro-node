import { Model } from "./model";
import { extractNumber, JsonType } from "../json-util";

export class Table extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly locationId: number
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJSON(d: string | JsonType): Table {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Table(
      ...Model.extractPropsFromJSON(d),
      extractNumber(d, "location_id")
    );
  }
}
