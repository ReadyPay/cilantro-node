import { TableShape } from "../models/table";
import { JsonSerializer, JsonType } from "../json-util";

export interface TableUpdateFields {
  shape?: TableShape;
  name?: string;
  xCoordinate?: number;
  yCoordinate?: number;
}

export class TableUpdateRequest implements JsonSerializer {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly fields: TableUpdateFields
  ) {}

  toJson(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      shape: this.fields.shape,
      name: this.fields.name,
      x_coordinate: this.fields.xCoordinate,
      y_coordinate: this.fields.yCoordinate,
    };
  }
}
