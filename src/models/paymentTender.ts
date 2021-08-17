import { Model } from "./model";
import { extractNumber, extractString, JsonType } from "../json-util";

export class PaymentTender extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly locationId: number,
    readonly name: string
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJson(d: string | JsonType): PaymentTender {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new PaymentTender(
      ...Model.extractPropsfromJson(d),
      extractNumber(d, "location_id"),
      extractString(d, "name")
    );
  }
}
