import { JsonSerializer, JsonType } from "../json-util";

export class TaxRateCreateRequest implements JsonSerializer {
  constructor(
    readonly locationId: number,

    readonly name?: string,
    readonly rate?: number
  ) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      name: this.name,
      rate: this.rate,
    };
  }
}
