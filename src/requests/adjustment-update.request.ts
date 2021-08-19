import { JsonSerializer, JsonType } from "../json-util";

export interface AdjustmentUpdateFields {
  value: number;
}

export class AdjustmentUpdateRequest implements JsonSerializer {
  constructor(
    public id: number,
    public locationId: number,
    public fields: AdjustmentUpdateFields
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      value: this.fields.value,
    };
  }
}
