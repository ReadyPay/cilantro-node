import { JsonSerializer, JsonType } from "../json-util";

export class AdjustmentCreateRequest implements JsonSerializer {
  constructor(public locationId: number, public value: number) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      value: this.value,
    };
  }
}
