import { JsonSerializer, JsonType } from "../json-util";

export interface PaymentTenderUpdateFields {
  name: string;
}

export class PaymentTenderUpdateRequest implements JsonSerializer {
  constructor(
    public id: number,
    public locationId: number,
    public fields: PaymentTenderUpdateFields
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      name: this.fields.name,
    };
  }
}
