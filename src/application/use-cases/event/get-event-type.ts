import { EventType } from "../../../domain/entities/event.entitiy";
import { EventTypeRepository } from "../../../domain/repositories/event-type-repository.interface";

export class GetEventTypeUseCase {
    constructor(private eventTypeRepository: EventTypeRepository){}

    async getEventType():Promise<EventType[] | null> {
        return this.eventTypeRepository.getEventType()
    }
}