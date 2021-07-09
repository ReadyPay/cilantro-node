import { Item } from "../models/item";

export class PriceCheckRequest {
  constructor(readonly locationId: number, readonly items: Item[]) {}
}
