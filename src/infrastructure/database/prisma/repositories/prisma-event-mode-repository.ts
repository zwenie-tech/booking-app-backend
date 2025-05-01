import { PrismaClient } from "@prisma/client";
import { EventMode } from "../../../../domain/entities/event.entitiy";
import { EventModeRepository } from "../../../../domain/repositories/event-mode-repository.interface";

export class PrismaEventModeRepository implements EventModeRepository {
  constructor(private prisma: PrismaClient) {}
  async getEventMode(): Promise<EventMode[] | null> {
    const prismaEventMode = await this.prisma.eventMode.findMany({});
    if (prismaEventMode) {
       return prismaEventMode.map(e => new EventMode(e.id, e.name));
    }
    return null;
  }

}
