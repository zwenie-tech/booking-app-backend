import { EventRepository } from "../../../../domain/repositories/event-repository.interface";
import { Event } from "../../../../domain/entities/event.entitiy";
import { PrismaClient } from "@prisma/client";

export class PrismaEventRepository implements EventRepository {
  constructor(private prisma: PrismaClient) {}
  async popularEvents(): Promise<Event[] | null> {
    const prismaEvents = await this.prisma.event.findMany({
      orderBy: { startDate: "asc" },
      where: {
        status: "published",
      },
    });
    if (prismaEvents) {
      return prismaEvents;
    }
    return null;
  }

  async findAll(): Promise<Event[] | null> {
    const prismaEvents = await this.prisma.event.findMany({
      take: 20,
      orderBy: { startDate: "asc" },
      where: {
        status: "published",
      },
    });
    if (prismaEvents) {
      return prismaEvents;
    }
    return null;
  }

  async featuredEvents(): Promise<Event[] | null> {
    const events = await this.prisma.event.findMany({
      where: {
        OR: [{ status: "published" }, { featured: true }],
      },
      orderBy: {
        endDate: "asc",
      },
    });
    if (events) {
      return events;
    }
    return null;
  }

  async getEventById(id: number): Promise<Event | null> {
    const event = await this.prisma.event.findFirst({
      where: {
        OR: [{ id }, { status: "published" }],
      },
    });
    if (event) {
      return event;
    }
    return null;
  }
}
