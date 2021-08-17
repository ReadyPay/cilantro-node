import { JsonSerializer, JsonType } from "../json-util";

export class PaymentTenderCreateRequest implements JsonSerializer {
  constructor(readonly locationId: number, readonly name: string) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      name: this.name,
    };
  }
}
