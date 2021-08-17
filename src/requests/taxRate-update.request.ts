import { JsonType } from "../json-util";

export class TaxRateUpdateRequest {
  constructor(
    readonly id: number,
    readonly locationId: number,

    readonly name?: string,
    readonly rate?: number
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      name: this.name,
      rate: this.rate,
    };
  }
}
