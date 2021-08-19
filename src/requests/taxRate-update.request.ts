import { JsonType } from "../json-util";

export interface TaxRateUpdateFields {
  name?: string;
  rate?: number;
}

export class TaxRateUpdateRequest {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly fields: TaxRateUpdateFields
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      name: this.fields.name,
      rate: this.fields.rate,
    };
  }
}
