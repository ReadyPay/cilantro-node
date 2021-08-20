import { JsonType } from "../json-util";
import { PriceCheckItemRequest } from "./price-check-item.request";
import { AdjustmentRequest } from "./adjustment.request";
import {
  PriceCheckPaymentRequest,
  priceCheckPaymentRequestToJson,
} from "./price-check-payment.request";

export interface SubmitOrderRequest {
  locationId: number;
  tableId: number;

  items?: PriceCheckItemRequest[];
  adjustments?: AdjustmentRequest[];
  payments?: PriceCheckPaymentRequest[];
  tipAmount?: number;
}

export function submitOrderRequestToJson(r: SubmitOrderRequest): JsonType {
  return {
    location_id: r.locationId,
    table_id: r.tableId,
    items: r.items,
    adjustments: r.adjustments,
    payments: r.payments?.map((p) => priceCheckPaymentRequestToJson(p)),
    tip_amount: r.tipAmount,
  };
}
