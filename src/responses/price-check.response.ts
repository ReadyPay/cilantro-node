import { extractNumber, JsonType } from "../json-util";

export class PriceCheckResponse {
  constructor(
    readonly itemTotal: number,
    readonly taxTotal: number,
    readonly adjustmentTotal: number,
    readonly total: number,
    readonly paymentTotal: number,
    readonly paymentDue: number
  ) {}

  static fromJSON(d: string | JsonType): PriceCheckResponse {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new PriceCheckResponse(
      extractNumber(d, "item_total"),
      extractNumber(d, "tax_total"),
      extractNumber(d, "adjustment_total"),
      extractNumber(d, "total"),
      extractNumber(d, "payment_total"),
      extractNumber(d, "payment_due")
    );
  }
}
