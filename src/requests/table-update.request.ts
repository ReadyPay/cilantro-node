import { TableShape } from "../models/table";
import { JsonSerializer, JsonType } from "../json-util";

export class TableUpdateRequest implements JsonSerializer {
  constructor(
    readonly id: number,
    readonly locationId: number,
    readonly shape: TableShape,

    readonly name?: string,
    readonly xCoordinate?: number,
    readonly yCoordinate?: number
  ) {}

  toJSON(): JsonType {
    return {
      id: this.id,
      location_id: this.locationId,
      shape: this.shape,
      name: this.name,
      x_coordinate: this.xCoordinate,
      y_coordinate: this.yCoordinate,
    };
  }
}
