import { PrismaClient } from "@prisma/client";
import { UserTokenRepository } from "../../../../domain/repositories/user-token-repository.interface";
import { UserToken } from "../../../../domain/entities/user-token.entitiy";

export class PrismaUserTokenRepository implements UserTokenRepository {
  constructor(private prisma: PrismaClient) {}

  async storeRefreshToken(userToken: UserToken): Promise<UserToken> {
    const result = await this.prisma.refreshToken.create({
      data: {
        token: userToken.token,
        userId: userToken.userId,
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Todo: Change to env
      },
    });
    return new UserToken(
      result.id,
      result.userId,
      result.token,
      result.createdAt,
      result.expiresAt
    );
  }

  async getRefreshToken(userId: number): Promise<UserToken | null> {
    const result = await this.prisma.refreshToken.findFirst({
      where: {
        userId,
      },
    });
    if (result) {
      return new UserToken(
        result.id,
        result.userId,
        result.token,
        result.createdAt,
        result.expiresAt
      );
    } else {
      return result;
    }
  }

  async deleteRefreshToken(userId: number): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
