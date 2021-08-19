import { AdjustmentRequest } from "./adjustment.request";
import { ModifierRequest } from "./modifier.request";

export class ItemRequest {
  constructor(
    public id: number,
    public quantity: number,
    public adjustments?: AdjustmentRequest[],
    public modifiers?: ModifierRequest[]
  ) {}
}
