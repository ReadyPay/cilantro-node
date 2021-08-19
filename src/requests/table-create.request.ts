import { TableShape } from "../models/table";
import { JsonSerializer, JsonType } from "../json-util";

export class TableCreateRequest implements JsonSerializer {
  constructor(
    public locationId: number,
    public shape: TableShape,

    public name?: string,
    public xCoordinate?: number,
    public yCoordinate?: number
  ) {}

  toJson(): JsonType {
    return {
      location_id: this.locationId,
      shape: this.shape,
      name: this.name,
      x_coordinate: this.xCoordinate,
      y_coordinate: this.yCoordinate,
    };
  }
}
