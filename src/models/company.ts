import { Model } from "./model";
import { extractString, JsonType } from "../json-util";

export class Company extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly name: string
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJson(d: string | JsonType): Company {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Company(
      ...Model.extractPropsFromJson(d),
      extractString(d, "name")
    );
  }
}
