import { AdjustmentRequest } from "./adjustment.request";
import { PriceCheckModifierRequest } from "./price-check-modifier.request";

export interface PriceCheckItemRequest {
  id: number;
  quantity: number;

  adjustments?: AdjustmentRequest[];
  modifiers?: PriceCheckModifierRequest[];
}
