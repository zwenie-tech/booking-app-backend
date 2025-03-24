import { EventGallery } from "../entities/eventGallery.entitiy";

export interface EventGalleryRepository {
  getEventGalleryByEventId(eventId: number): Promise<EventGallery[] | null>;
}
