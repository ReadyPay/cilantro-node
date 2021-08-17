export class LocationUpdateRequest {
  constructor(
    readonly id: number,

    readonly name?: string,
    readonly address?: string
  ) {}
}
