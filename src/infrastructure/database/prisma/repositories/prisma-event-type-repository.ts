import { PrismaClient } from "@prisma/client";
import { EventTypeRepository } from "../../../../domain/repositories/event-type-repository.interface";
import { EventType } from "../../../../domain/entities/event.entitiy";

export class PrismaEventTypeRepository implements EventTypeRepository {
  constructor(private prisma: PrismaClient) {}
  async getEventType(): Promise<EventType[] | null> {
    const prismaEventType = await this.prisma.eventType.findMany({});
    if (prismaEventType) {
       return prismaEventType.map(e => new EventType(e.id, e.name));
    }
    return null;
  }

}
