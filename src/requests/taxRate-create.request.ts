import { JsonSerializer, JsonType } from "../json-util";

export class TaxRateCreateRequest implements JsonSerializer {
  constructor(
    public locationId: number,

    public name?: string,
    public rate?: number
  ) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      name: this.name,
      rate: this.rate,
    };
  }
}
