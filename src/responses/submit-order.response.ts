import { extractNestedModel, extractNumber, JsonType } from "../json-util";
import { PriceCheckResponse } from "./price-check.response";

export class SubmitOrderResponse {
  constructor(
    readonly orderId: number,
    readonly priceCheck: PriceCheckResponse | null
  ) {}

  static fromJSON(d: string | JsonType): SubmitOrderResponse {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new SubmitOrderResponse(
      extractNumber(d, "order_id"),
      extractNestedModel(d, "price_check", PriceCheckResponse)
    );
  }
}
