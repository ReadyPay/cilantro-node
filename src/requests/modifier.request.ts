export class ModifierRequest {
  constructor(
    readonly id: number,
    readonly quantity: number,
    readonly modifiers?: ModifierRequest[]
  ) {}
}
