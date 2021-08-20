import { JsonType } from "../json-util";
import { AdjustmentType, CalculationPhase } from "../models/adjustment";

export interface AdjustmentCreateRequest {
  locationId: number;
  // TODO make these two optional
  type: AdjustmentType;
  calculationPhase: CalculationPhase;

  name?: string;
  value?: number;
  isOpenValue?: boolean;
}

export function adjustmentCreateRequestToJson(
  r: AdjustmentCreateRequest
): JsonType {
  return {
    location_id: r.locationId,
    type: r.type,
    calculation_phase: r.calculationPhase,
    name: r.name,
    value: r.value,
    is_open_value: r.isOpenValue,
  };
}
