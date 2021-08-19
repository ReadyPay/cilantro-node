export class ModifierRequest {
  constructor(
    public id: number,
    public quantity: number,
    public modifiers?: ModifierRequest[]
  ) {}
}
