import { Model } from "./model";
import {
  extractBool,
  extractEnum,
  extractNumber,
  extractString,
  JsonType,
} from "../json-util";

export class Adjustment extends Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly locationId: number,
    readonly name: string,
    readonly value: number,
    readonly isOpenValue: boolean,
    readonly type: AdjustmentType,
    readonly calculationPhase: CalculationPhase
  ) {
    super(id, createdAt, updatedAt);
  }

  static fromJson(d: string | JsonType): Adjustment {
    if (typeof d === "string") {
      d = JSON.parse(d) as JsonType;
    }
    return new Adjustment(
      ...Model.extractPropsfromJson(d),
      extractNumber(d, "location_id"),
      extractString(d, "name"),
      extractNumber(d, "value"),
      extractBool(d, "is_open_value"),
      extractEnum(d, "type", AdjustmentType, AdjustmentType.Amount),
      extractEnum(
        d,
        "calculation_phase",
        CalculationPhase,
        CalculationPhase.AfterTax
      )
    );
  }
}

export enum AdjustmentType {
  Percentage = "percent",
  Amount = "amount",
}

export enum CalculationPhase {
  BeforeTax = "beforeTax",
  AfterTax = "afterTax",
}
