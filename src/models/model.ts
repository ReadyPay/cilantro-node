import { extractDate, extractNumber, JsonType } from "../json-util";

export class Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}

  protected static extractPropsFromJSON(d: JsonType): [number, Date, Date] {
    return [
      extractNumber(d, "id"),
      extractDate(d, "created_at"),
      extractDate(d, "updated_at"),
    ];
  }
}
