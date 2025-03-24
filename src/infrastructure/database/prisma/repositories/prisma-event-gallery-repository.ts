import { PrismaClient } from "@prisma/client";
import { EventGallery } from "../../../../domain/entities/eventGallery.entitiy";
import { EventGalleryRepository } from "../../../../domain/repositories/event-gallery.interface";

export class PrismaEventGalleryRepository implements EventGalleryRepository {
  constructor(private prisma: PrismaClient) {}
  async getEventGalleryByEventId(
    eventId: number
  ): Promise<EventGallery[] | null> {
    const gallery = await this.prisma.eventGallery.findMany({
      where: {
        eventId,
      },
    });
    if (gallery) {
      return gallery;
    }
    return null;
  }
}
