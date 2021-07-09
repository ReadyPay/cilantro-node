export class ModifierRequest {
  constructor(readonly id: number, readonly modifiers: ModifierRequest[]) {}
}
