export class EventGallery {
  constructor(
    public readonly id: number,
    public readonly eventId: number,
    public readonly imageUrl: string,
    public readonly updatedAt: Date,
    public readonly createdAt: Date
  ) {}
}
