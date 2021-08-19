import { JsonSerializer, JsonType } from "../json-util";

export class PaymentTenderCreateRequest implements JsonSerializer {
  constructor(public locationId: number, public name: string) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      name: this.name,
    };
  }
}
