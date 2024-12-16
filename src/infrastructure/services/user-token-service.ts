import jwt from "jsonwebtoken";
import { UserTokenRepository } from "../../domain/repositories/user-token-repository.interface";
import { UserToken } from "../../domain/entities/user-token.entitiy";
import { UserTokenServiceRepository } from "../../domain/repositories/user-token-service-repository.interface";

export class UserTokenService implements UserTokenServiceRepository {
  constructor(private tokenRepository: UserTokenRepository) {}

  private generateToken(userId: number, type: "access" | "refresh"): string {
    const secret =
      type === "access"
        ? process.env.ACCESS_TOKEN_SECRET!
        : process.env.REFRESH_TOKEN_SECRET!;

    const expiresIn =
      type === "access"
        ? process.env.ACCESS_TOKEN_EXPIRES!
        : process.env.REFRESH_TOKEN_EXPIRES!;

    return jwt.sign({ userId }, secret, { expiresIn });
  }

  async generateAccessToken(userToken: UserToken): Promise<string> {
    return this.generateToken(userToken.userId, "access");
  }

  async generateRefreshToken(userToken: UserToken): Promise<string> {
    const token = this.generateToken(userToken.userId, "refresh");
    const result = await this.tokenRepository.storeRefreshToken(
      new UserToken(
        userToken.id,
        userToken.userId,
        token,
        userToken.createdAt,
        userToken.expiresAt
      )
    );

    return result.token;
  }

  async verifyAccessToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: string;
      };
      return decoded.userId;
    } catch {
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: string;
      };
      return decoded.userId;
    } catch {
      return null;
    }
  }

  async revokeRefreshToken(userId: number): Promise<void> {
    await this.tokenRepository.deleteRefreshToken(userId);
  }
}