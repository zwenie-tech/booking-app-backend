import { PrismaClient } from "@prisma/client";
import { EventStatus, EventType } from "../../../../domain/entities/event.entitiy";
import { EventStatusRepository } from "../../../../domain/repositories/event-status-repository.interface";

export class PrismaEventStatusRepository implements EventStatusRepository {
  constructor(private prisma: PrismaClient) {}
  async getEventStatus(): Promise<EventStatus[] | null> {
    const prismaEventStatus = await this.prisma.eventStatus.findMany({});
    if (prismaEventStatus) {
       return prismaEventStatus.map(e => new EventStatus(e.id, e.name));
    }
    return null;
  }

}
