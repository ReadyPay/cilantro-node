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
    public id: number,
    public locationId: number,
    public fields: TableUpdateFields
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
