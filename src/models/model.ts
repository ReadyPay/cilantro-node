import {
  extractDate,
  extractNullDate,
  extractNumber,
  JsonType,
} from "../json-util";

export class Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}

  static extractPropsFromJSON(d: JsonType): [number, Date, Date | null] {
    return [
      extractNumber(d, "id"),
      extractDate(d, "created_at"),
      extractNullDate(d, "updated_at"),
    ];
  }
}
