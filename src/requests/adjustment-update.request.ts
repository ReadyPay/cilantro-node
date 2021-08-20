import { JsonType } from "../json-util";
import { AdjustmentType, CalculationPhase } from "../models/adjustment";

export interface AdjustmentUpdateRequest {
  id: number;
  locationId: number;

  type?: AdjustmentType;
  calculationPhase?: CalculationPhase;
  name?: string;
  value?: number;
  isOpenValue?: boolean;
}

export function adjustmentUpdateRequestToJson(
  r: AdjustmentUpdateRequest
): JsonType {
  return {
    id: r.id,
    location_id: r.locationId,
    type: r.type,
    calculation_phase: r.calculationPhase,
    name: r.name,
    value: r.value,
    is_open_value: r.isOpenValue,
  };
}
