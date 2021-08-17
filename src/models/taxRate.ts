import { Model } from "./model";
import { extractNumber, extractString, JsonType } from "../json-util";

export class TaxRate extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly locationId: number,
    readonly name: string,
    readonly rate: number
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJSON(d: string | JsonType): TaxRate {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new TaxRate(
      ...Model.extractPropsFromJSON(d),
      extractNumber(d, "location_id"),
      extractString(d, "name"),
      extractNumber(d, "rate")
    );
  }
}
