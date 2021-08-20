export interface PriceCheckModifierRequest {
  id: number;
  quantity: number;
  modifiers?: PriceCheckModifierRequest[];
}
