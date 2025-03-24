import { EventGallery } from "../../../domain/entities/eventGallery.entitiy";
import { EventGalleryRepository } from "../../../domain/repositories/event-gallery.interface";

export class GetEventGalleryUseCase{
    constructor(private eventGalleryRepository: EventGalleryRepository){}
    async getEventGalleryByEventId(eventId: number):Promise<EventGallery[] | null>{
        return this.eventGalleryRepository.getEventGalleryByEventId(eventId);
    }
}