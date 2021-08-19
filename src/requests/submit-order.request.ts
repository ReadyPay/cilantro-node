import { JsonSerializer, JsonType } from "../json-util";
import { ItemRequest } from "./item.request";
import { AdjustmentRequest } from "./adjustment.request";
import { PaymentRequest } from "./payment.request";

export class SubmitOrderRequest implements JsonSerializer {
  constructor(
    public locationId: number,
    public tableId: number,
    public items?: ItemRequest[],
    public adjustments?: AdjustmentRequest[],
    public payments?: PaymentRequest[],
    public tipAmount?: number
  ) {}

  toJson(): JsonType {
    return {
      items: this.items,
      adjustments: this.adjustments,
      payments: this.payments?.map((p) => p.toJson()),
      tip_amount: this.tipAmount,
    };
  }
}
