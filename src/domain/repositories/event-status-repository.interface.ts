import { EventStatus } from "../entities/event.entitiy";

export interface EventStatusRepository {
  getEventStatus(): Promise<EventStatus[] | null>;
}
