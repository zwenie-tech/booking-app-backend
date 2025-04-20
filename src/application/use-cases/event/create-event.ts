import { Event } from "../../../domain/entities/event.entitiy";
import { Organizer } from "../../../domain/entities/organizer.entity";
import { EventRepository } from "../../../domain/repositories/event-repository.interface";
import { OrganizerRepository } from "../../../domain/repositories/organizer-repository.interface";

export class CreateEventUseCase {
  constructor(private eventRepository: EventRepository) {}
  async execute(
    orgId: number,
    name: string,
    shortDescription: string,
    startDate: Date,
    endDate: Date,
    type: number,
    status: number,
    mode: number,
    categoryId: number,
    description: string,
    location: string,
    address: string,
    meetlink: string,
    coverPhoto: string,
  ): Promise<Event | null> {
    const org = new Event(
      1,
      orgId,
      name,
      shortDescription,
      startDate,
      endDate,
      type,
      status,
      mode,
      categoryId,
      description,
      location,
      address,
      meetlink,
      coverPhoto,
      false,
      new Date(),
      new Date()
    );
    return this.eventRepository.create(org);
  }
}
