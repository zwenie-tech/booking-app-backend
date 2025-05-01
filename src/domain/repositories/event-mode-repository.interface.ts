import { EventMode } from "../entities/event.entitiy";

export interface EventModeRepository {
  getEventMode(): Promise<EventMode[] | null>;
}
