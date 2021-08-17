import { JsonSerializer, JsonType } from "../json-util";

export class PaymentTenderUpdateRequest implements JsonSerializer {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly name: string
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      name: this.name,
    };
  }
}
