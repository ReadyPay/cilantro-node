import { JsonType } from "../json-util";

export interface PriceCheckPaymentRequest {
  tenderId: number;
  value: number;
}

export function priceCheckPaymentRequestToJson(
  r: PriceCheckPaymentRequest
): JsonType {
  return {
    tender_id: r.tenderId,
    value: r.value,
  };
}
