import { EventStatus } from "../../../domain/entities/event.entitiy";
import { EventStatusRepository } from "../../../domain/repositories/event-status-repository.interface";
export class GetEventStatusUseCase {
    constructor(private eventStatusRepository: EventStatusRepository){}

    async getEventStatus():Promise<EventStatus[] | null> {
        return this.eventStatusRepository.getEventStatus()
    }
}