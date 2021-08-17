import { JsonSerializer, JsonType } from "../json-util";

export class AdjustmentCreateRequest implements JsonSerializer {
  constructor(readonly locationId: number, readonly value: number) {}

  toJSON(): JsonType {
    return {
      location_id: this.locationId,
      value: this.value,
    };
  }
}
