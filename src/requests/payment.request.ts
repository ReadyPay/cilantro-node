import { JsonSerializer, JsonType } from "../json-util";

export class PaymentRequest implements JsonSerializer {
  constructor(readonly tenderId: number, readonly value: number) {}

  toJson(): JsonType {
    return {
      tender_id: this.tenderId,
      value: this.value,
    };
  }
}
