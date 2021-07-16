import { AdjustmentRequest } from "./adjustment.request";
import { ModifierRequest } from "./modifier.request";

export class ItemRequest {
  constructor(
    readonly id: number,
    readonly quantity: number,
    readonly adjustments?: AdjustmentRequest[],
    readonly modifiers?: ModifierRequest[]
  ) {}
}
