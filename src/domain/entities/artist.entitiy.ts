export class Artist {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly eventId: number,
    public readonly tag: string,
    public readonly profile: string | null,
    public readonly updatedAt: Date,
    public readonly createdAt: Date
  ) {}
}
