import jwt from "jsonwebtoken";
import { HostTokenRepository } from "../../domain/repositories/host-token-repository.interface";
import { HostTokenServiceRepository } from "../../domain/repositories/host-token-service-repository.interface";
import { HostToken } from "../../domain/entities/host-token.entitiy";

export class HostTokenService implements HostTokenServiceRepository {
  constructor(private tokenRepository: HostTokenRepository) {}

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

  async generateAccessToken(hostToken: HostToken): Promise<string> {
    return this.generateToken(hostToken.hostId, "access");
  }

  async generateRefreshToken(hostToken: HostToken): Promise<string> {
    const token = this.generateToken(hostToken.hostId, "refresh");
    const result = await this.tokenRepository.storeRefreshToken(
      new HostToken(
        hostToken.id,
        hostToken.hostId,
        token,
        hostToken.createdAt,
        hostToken.expiresAt
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
