import { TableShape } from "../models/table";
import { JsonType } from "../json-util";

export interface TableCreateRequest {
  locationId: number;
  // TODO make optional
  shape: TableShape;

  name?: string;
  xCoordinate?: number;
  yCoordinate?: number;
}

export function tableCreateRequestToJson(r: TableCreateRequest): JsonType {
  return {
    location_id: r.locationId,
    shape: r.shape,
    name: r.name,
    x_coordinate: r.xCoordinate,
    y_coordinate: r.yCoordinate,
  };
}
