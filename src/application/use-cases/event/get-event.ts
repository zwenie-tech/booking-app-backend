import { Event } from "../../../domain/entities/event.entitiy";
import { EventRepository } from "../../../domain/repositories/event-repository.interface";

export class GetEventUseCase {
    constructor(private eventRepository: EventRepository){}
    async execute():Promise<Event[] | null> {
        return this.eventRepository.findAll() 
    }

    async getFeaturedEvents():Promise<Event[] | null> {
        return this.eventRepository.featuredEvents()
    }

    async getPopularEvents():Promise<Event[] | null> {
        return this.eventRepository.popularEvents()
    }
}