import { EventRepository } from "../../../../domain/repositories/event-repository.interface";
import { Event } from "../../../../domain/entities/event.entitiy";
import { PrismaClient } from "@prisma/client";

export class PrismaEventRepository implements EventRepository {
  constructor(private prisma: PrismaClient) {}
  async popularEvents(): Promise<Event[] | null> {
    const prismaEvents = await this.prisma.event.findMany({
      orderBy: { startDate: "asc" },
      where: {
        status: 2,
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
        status: 2,
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
        OR: [{ status: 2 }, { featured: true }],
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
        OR: [{ id }, { status: 2 }],
      },
    });
    if (event) {
      return event;
    }
    return null;
  }

  async create(event: Event): Promise<Event | null> {
    // const existingUser = await this.prisma.user.findFirst({
    //   where: {
    //     OR: [{ email: user.email }, { phone: user.phone }],
    //   },
    // });
    // if (existingUser) {
    //   return null;
    // }

    const result = await this.prisma.event.create({
      data: {
        orgId: event.orgId,
        name: event.name,
        shortDescription: event.shortDescription,
        startDate: event.startDate,
        endDate: event.endDate,
        type: event.type,
        status: event.status,
        mode: event.mode,
        categoryId: event.categoryId,
        description: event.description,
        location: event.location,
        address: event.address,
        meetLink: event.meetLink,
        coverPhoto: event.coverPhoto,
      },
    });

    return new Event(
      result.id,
      result.orgId,
      result.name,
      result.shortDescription,
      result.startDate,
      result.endDate,
      result.type,
      result.status,
      result.mode,
      result.categoryId,
      result.description,
      result.location,
      result.address,
      result.meetLink,
      result.coverPhoto,
      result.featured,
      result.updatedAt,
      result.createdAt
    );
  }
}
