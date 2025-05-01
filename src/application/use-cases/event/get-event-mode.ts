import { EventMode } from "../../../domain/entities/event.entitiy";
import { EventModeRepository } from "../../../domain/repositories/event-mode-repository.interface";
export class GetEventModeUseCase {
    constructor(private eventModeRepository: EventModeRepository){}

    async getEventMode():Promise<EventMode[] | null> {
        return this.eventModeRepository.getEventMode()
    }
}