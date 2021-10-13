import { Model } from "./model";
import { extractNullableNumber, extractString, JsonType } from "../json-util";

export class Location extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly companyId: number | null,
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
      ...Model.extractPropsFromJson(d),
      extractNullableNumber(d, "company_id"),
      extractString(d, "name"),
      extractString(d, "address")
    );
  }
}
