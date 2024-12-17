import { User } from "../../../../domain/entities/user.entitiy";
import { UserRepository } from "../../../../domain/repositories/user-repository.interface";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}
  async create(user: User): Promise<User | null> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { phone: user.phone }],
      },
    });
    if (existingUser) {
      return null;
    }

    const result = await this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        profile: user.profile,
      },
    });

    return new User(
      result.id,
      result.firstName,
      result.lastName,
      result.email,
      result.phone,
      result.profile,
      result.isDeleted,
      result.deletedDate,
      result.password,
      result.createAt
    );
  }
  async findById(id: number): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (result) {
      return new User(
        result.id,
        result.firstName,
        result.lastName,
        result.email,
        result.phone,
        result.profile,
        result.isDeleted,
        result.deletedDate,
        result.password,
        result.createAt
      );
    } else {
      return result;
    }
  }
  async update(id: number, userData: Partial<User>): Promise<User | null> {
    return new User(
      2,
      "Alice",
      "Smith",
      "alice.smith@example.com",
      "1234567890",
      "https://example.com/profiles/alice.jpg",
      false,
      null,
      "password123",
      new Date("2024-01-15T08:00:00Z")
    );
  }

  async delete(id: number): Promise<void> {}
  async findAll(): Promise<User[] | null> {
    return null;
  }
  async findByCredentials(
    username: string,
    password: string
  ): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { phone: username }],
      },
    });
    if (result) {
      if (result.password === password) {
        return new User(
          result.id,
          result.firstName,
          result.lastName,
          result.email,
          result.phone,
          result.profile,
          result.isDeleted,
          result.deletedDate,
          result.password,
          result.createAt
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { phone: username }],
      },
    });
    if (result) {
      return new User(
        result.id,
        result.firstName,
        result.lastName,
        result.email,
        result.phone,
        result.profile,
        result.isDeleted,
        result.deletedDate,
        result.password,
        result.createAt
      );
    } else {
      return result;
    }
  }
}
