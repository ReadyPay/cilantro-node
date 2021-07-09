import { Model } from "./model";
import {
  extractEnum,
  extractNumber,
  extractString,
  JsonType,
} from "../json-util";

export class Table extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly locationId: number,
    readonly name: string,
    readonly xCoordinate: number,
    readonly yCoordinate: number,
    readonly shape: TableShape
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJSON(d: string | JsonType): Table {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Table(
      ...Model.extractPropsFromJSON(d),
      extractNumber(d, "location_id"),
      extractString(d, "name"),
      extractNumber(d, "x_coordinate"),
      extractNumber(d, "y_coordinate"),
      extractEnum(d, "shape", TableShape, TableShape.Square)
    );
  }
}

export enum TableShape {
  Rectangle = "rectangle",
  Square = "square",
}
