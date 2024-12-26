import jwt from "jsonwebtoken";
import { UserTokenServiceRepository } from "../../../domain/repositories/user-token-service-repository.interface";
import { UserTokenRepository } from "../../../domain/repositories/user-token-repository.interface";
import { UserToken } from "../../../domain/entities/user-token.entitiy";

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

  async generateAccessToken(userId: number): Promise<string> {
    return this.generateToken(userId!, "access");
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

  async verifyAccessToken(token: string): Promise<number | null> {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
        userId: number;
      };
      return decoded.userId;
    } catch {
      return null;
    }
  }

  async verifyRefreshToken(token: string): Promise<number | null> {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: number;
      };
      return decoded.userId;
    } catch {
      return null;
    }
  }

  async revokeRefreshToken(userId: number): Promise<boolean> {
    return await this.tokenRepository.deleteRefreshToken(userId);
  }
}
