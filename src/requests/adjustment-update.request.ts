import { JsonSerializer, JsonType } from "../json-util";

export interface AdjustmentUpdateFields {
  value: number;
}

export class AdjustmentUpdateRequest implements JsonSerializer {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly fields: AdjustmentUpdateFields
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      value: this.fields.value,
    };
  }
}
