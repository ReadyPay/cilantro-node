import { JsonType } from "../json-util";

export interface TaxRateUpdateFields {
  name?: string;
  rate?: number;
}

export class TaxRateUpdateRequest {
  constructor(
    public id: number,
    public locationId: number,
    public fields: TaxRateUpdateFields
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
