import { PrismaClient } from "@prisma/client";
import { Organizer } from "../../../../domain/entities/organizer.entity";
import { OrganizerRepository } from "../../../../domain/repositories/organizer-repository.interface";

export class PrismaOrganizerRepository implements OrganizerRepository {
  constructor(private prisma: PrismaClient) {}
  async create(organizer: Organizer): Promise<Organizer | null> {
    const org = await this.prisma.organizer.create({
      data: {
        name: organizer.name,
        address: organizer.address,
        about: organizer.about
      },
    });
    return new Organizer(
      org.id,
      org.name,
      org.address,
      org.website!,
      org.logo!,
      org.about,
      org.facebook!,
      org.instagram!,
      org.twitter!,
      org.createdAt,
      org.updatedAt
    );
  }

  async findById(orgId: number): Promise<Organizer | null> {
    const org = await this.prisma.organizer.findFirst({
      where: {
        id: orgId,
      },
    });
    if (org) {
      return new Organizer(
        org.id,
        org.name,
        org.address,
        org.website!,
        org.logo!,
        org.about,
        org.facebook!,
        org.instagram!,
        org.twitter!,
        org.createdAt,
        org.updatedAt
      );
    } else {
      return null;
    }
  }
}
