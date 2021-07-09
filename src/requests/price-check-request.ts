import { ItemRequest } from "./item-request";
import { AdjustmentRequest } from "./adjustment-request";
import { PaymentRequest } from "./payment-request";

export class PriceCheckRequest {
  constructor(
    readonly locationId: number,
    readonly items: ItemRequest[],
    readonly adjustments: AdjustmentRequest[],
    readonly payments: PaymentRequest[]
  ) {}
}
