import { PrismaClient } from "@prisma/client";
import { Host } from "../../../../domain/entities/host.entitiy";
import { HostRepository } from "../../../../domain/repositories/host-repository.interface";

export class PrismaHostRepository implements HostRepository {
  constructor(private prisma: PrismaClient) {}
  async create(host: Host): Promise<Host | null> {
    const existingHost = await this.prisma.host.findFirst({
      where: {
        OR: [{ email: host.email }, { phone: host.phone }],
      },
    });
    if (existingHost) {
      return null;
    }

    const result = await this.prisma.host.create({
      data: {
        firstName: host.firstName,
        lastName: host.lastName,
        email: host.email,
        phone: host.phone,
        password: host.password,
        profile: host.profile,
      },
    });

    if (result) {
      return new Host(
        result.id,
        result.firstName,
        result.lastName,
        result.email,
        result.phone!,
        result.profile,
        result.org_id!,
        result.role,
        result.isVerified,
        result.isDeleted,
        result.deletedDate,
        result.password,
        result.createdAt
      );
    } else {
      return result;
    }
  }
  async findById(id: number): Promise<Host | null> {
    const result = await this.prisma.host.findFirst({
      where: {
        id,
      },
    });
    if (result) {
      return new Host(
        result.id,
        result.firstName,
        result.lastName,
        result.email,
        result.phone!,
        result.profile,
        result.org_id!,
        result.role,
        result.isVerified,
        result.isDeleted,
        result.deletedDate,
        result.password,
        result.createdAt
      );
    } else {
      return result;
    }
  }
  async update(id: number, HostData: Partial<Host>): Promise<Host | null> {
    return new Host(
      2,
      "Alice",
      "Smith",
      "alice.smith@example.com",
      "1234567890",
      "https://example.com/profiles/alice.jpg",
      1,
      "",
      false,
      false,
      null,
      "",
      new Date("2024-01-15T08:00:00Z")
    );
  }

  async delete(id: number): Promise<void> {}
  async findAll(): Promise<Host[] | null> {
    return null;
  }
  async findByCredentials(
    username: string,
    password: string
  ): Promise<Host | null> {
    const result = await this.prisma.host.findFirst({
      where: {
        OR: [{ email: username }, { phone: username }],
      },
    });
    if (result) {
      if (result.password === password) {
        return new Host(
          result.id,
          result.firstName,
          result.lastName,
          result.email,
          result.phone!,
          result.profile,
          result.org_id!,
          result.role,
          result.isVerified,
          result.isDeleted,
          result.deletedDate,
          result.password,
          result.createdAt
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async findByHostname(Hostname: string): Promise<Host | null> {
    return null;
  }
  async findByUsername(username: string): Promise<Host | null> {
    const result = await this.prisma.host.findFirst({
      where: {
        OR: [{ email: username }, { phone: username }],
      },
    });
    if (result) {
      return new Host(
        result.id,
        result.firstName,
        result.lastName,
        result.email,
        result.phone!,
        result.profile,
        result.org_id!,
        result.role,
        result.isVerified,
        result.isDeleted,
        result.deletedDate,
        result.password,
        result.createdAt
      );
    } else {
      return result;
    }
  }

  async updateOrgById(orgId: number, hostId: number): Promise<Host | null> {
    const host = await this.prisma.host.update({
      where: {
        id: hostId,
      },
      data: {
        org_id: orgId,
      },
    });
    if (host) {
      return new Host(
        host.id,
        host.firstName,
        host.lastName,
        host.email,
        host.phone!,
        host.profile,
        host.org_id!,
        host.role,
        host.isVerified,
        host.isDeleted,
        host.deletedDate,
        host.password,
        host.createdAt
      );
    } else {
      return null;
    }
  }
}
