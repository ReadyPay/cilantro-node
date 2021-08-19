import { JsonSerializer, JsonType } from "../json-util";

export interface LocationUpdateFields {
  name?: string;
  address?: string;
}

export class LocationUpdateRequest implements JsonSerializer {
  constructor(readonly id: number, readonly fields: LocationUpdateFields) {}

  toJson(): JsonType {
    return {
      id: this.id,
      name: this.fields.name,
      address: this.fields.address,
    };
  }
}
