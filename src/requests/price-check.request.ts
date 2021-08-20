import { PriceCheckItemRequest } from "./price-check-item.request";
import { AdjustmentRequest } from "./adjustment.request";
import {
  PriceCheckPaymentRequest,
  priceCheckPaymentRequestToJson,
} from "./price-check-payment.request";
import { JsonType } from "../json-util";

export interface PriceCheckRequest {
  locationId: number;

  items?: PriceCheckItemRequest[];
  adjustments?: AdjustmentRequest[];
  payments?: PriceCheckPaymentRequest[];
}

export function priceCheckRequestToJson(r: PriceCheckRequest): JsonType {
  return {
    items: r.items,
    adjustments: r.adjustments,
    payments: r.payments?.map((p) => priceCheckPaymentRequestToJson(p)),
  };
}
