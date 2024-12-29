import { PrismaClient } from "@prisma/client";
import { HostTokenRepository } from "../../../../domain/repositories/host-token-repository.interface";
import { HostToken } from "../../../../domain/entities/host-token.entitiy";

export class PrismaHostTokenRepository implements HostTokenRepository {
  constructor(private prisma: PrismaClient) {}

  async storeRefreshToken(hostToken: HostToken): Promise<HostToken> {
    const result = await this.prisma.refreshTokenHost.create({
      data: {
        token: hostToken.token,
        hostId: hostToken.hostId,
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Todo: Change to env
      },
    });
    return new HostToken(
      result.id,
      result.hostId,
      result.token,
      result.createdAt,
      result.expiresAt
    );
  }

  async getRefreshToken(hostId: number): Promise<HostToken | null> {
    const result = await this.prisma.refreshTokenHost.findFirst({
      where: {
        hostId,
      },
    });
    if (result) {
      return new HostToken(
        result.id,
        result.hostId,
        result.token,
        result.createdAt,
        result.expiresAt
      );
    } else {
      return result;
    }
  }

  async deleteRefreshToken(hostId: number): Promise<boolean> {
    const result = await this.prisma.refreshTokenHost.deleteMany({
      where: {
        hostId,
      },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
