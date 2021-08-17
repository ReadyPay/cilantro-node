import { JsonSerializer, JsonType } from "../json-util";

export class AdjustmentUpdateRequest implements JsonSerializer {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly value: number
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      value: this.value,
    };
  }
}
