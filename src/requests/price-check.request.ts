import { ItemRequest } from "./item.request";
import { AdjustmentRequest } from "./adjustment.request";
import { PaymentRequest } from "./payment.request";
import { JsonSerializer, JsonType } from "../json-util";

export class PriceCheckRequest implements JsonSerializer {
  constructor(
    public locationId: number,
    public items?: ItemRequest[],
    public adjustments?: AdjustmentRequest[],
    public payments?: PaymentRequest[]
  ) {}

  toJson(): JsonType {
    return {
      items: this.items,
      adjustments: this.adjustments,
      payments: this.payments?.map((p) => p.toJson()),
    };
  }
}
