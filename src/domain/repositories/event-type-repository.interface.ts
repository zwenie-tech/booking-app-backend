import { EventStatus, EventType } from "../entities/event.entitiy";

export interface EventTypeRepository {
  getEventType(): Promise<EventType[] | null>;
}
