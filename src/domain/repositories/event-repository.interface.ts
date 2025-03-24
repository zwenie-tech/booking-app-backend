import { Event } from "../entities/event.entitiy";

export interface EventRepository {
  popularEvents(): Promise<Event[] | null>;
  findAll(): Promise<Event[] | null>;
  featuredEvents(): Promise<Event[] | null>;
  getEventById(id: number): Promise<Event | null>;
}
