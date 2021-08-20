import { TableShape } from "../models/table";
import { JsonType } from "../json-util";

export interface TableUpdateRequest {
  id: number;
  locationId: number;

  shape?: TableShape;
  name?: string;
  xCoordinate?: number;
  yCoordinate?: number;
}

export function tableUpdateRequestToJson(r: TableUpdateRequest): JsonType {
  return {
    id: r.id,
    location_id: r.locationId,
    shape: r.shape,
    name: r.name,
    x_coordinate: r.xCoordinate,
    y_coordinate: r.yCoordinate,
  };
}
