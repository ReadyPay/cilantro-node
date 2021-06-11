export class Model {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly updatedAt: Date | null
  ) {}
}