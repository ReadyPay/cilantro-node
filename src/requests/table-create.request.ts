import { TableShape } from "../models/table";
import { JsonSerializer, JsonType } from "../json-util";

export class TableCreateRequest implements JsonSerializer {
  constructor(
    readonly locationId: number,
    readonly shape: TableShape,

    readonly name?: string,
    readonly xCoordinate?: number,
    readonly yCoordinate?: number
  ) {}

  toJSON(): JsonType {
    return {
      location_id: this.locationId,
      shape: this.shape,
      name: this.name,
      x_coordinate: this.xCoordinate,
      y_coordinate: this.yCoordinate,
    };
  }
}
