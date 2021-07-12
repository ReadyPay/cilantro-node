import {JsonSerializer, JsonType} from "../json-util";
import {ItemRequest} from "./item.request";
import {AdjustmentRequest} from "./adjustment.request";
import {PaymentRequest} from "./payment.request";

export class SubmitOrderRequest implements JsonSerializer {
  constructor(
    readonly locationId: number,
    readonly tableId: number,
    readonly items?: ItemRequest[],
    readonly adjustments?: AdjustmentRequest[],
    readonly payments?: PaymentRequest[]
  ) {}

  toJSON(): JsonType {
    return {
      items: this.items,
      adjustments: this.adjustments,
      payments: this.payments?.map((p) => p.toJSON()),
    };
  }
}