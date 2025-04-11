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
        ? process.env.ACCESS_TOKEN_EXPIRES! // "15m"
        : process.env.REFRESH_TOKEN_EXPIRES!; // "7d"
  
    // Calculate expiration time in seconds
    const nowInSeconds = Math.floor(Date.now() / 1000);
    let expiresInSeconds: number;
  
    if (expiresIn.endsWith("m")) {
      expiresInSeconds = parseInt(expiresIn) * 60; // minutes to seconds
    } else if (expiresIn.endsWith("h")) {
      expiresInSeconds = parseInt(expiresIn) * 60 * 60; // hours to seconds
    } else if (expiresIn.endsWith("d")) {
      expiresInSeconds = parseInt(expiresIn) * 60 * 60 * 24; // days to seconds
    } else {
      throw new Error("Invalid expiresIn format. Use 'm', 'h', or 'd'.");
    }
  
    const exp = nowInSeconds + expiresInSeconds;
  
    return jwt.sign({ exp, userId }, secret);
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
