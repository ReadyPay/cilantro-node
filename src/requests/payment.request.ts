import { JsonSerializer, JsonType } from "../json-util";

export class PaymentRequest implements JsonSerializer {
  constructor(public tenderId: number, public value: number) {}

  toJson(): JsonType {
    return {
      tender_id: this.tenderId,
      value: this.value,
    };
  }
}
