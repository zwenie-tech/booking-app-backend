import jwt from "jsonwebtoken";
import { HostTokenServiceRepository } from "../../../domain/repositories/host-token-service-repository.interface";
import { HostTokenRepository } from "../../../domain/repositories/host-token-repository.interface";
import { HostToken } from "../../../domain/entities/host-token.entitiy";

export class HostTokenService implements HostTokenServiceRepository {
  constructor(private tokenRepository: HostTokenRepository) {}

  private generateToken(
    userId: number,
    orgId: number,
    type: "access" | "refresh"
  ): string {
    const secret =
      type === "access"
        ? process.env.ACCESS_TOKEN_SECRET_HOST!
        : process.env.REFRESH_TOKEN_SECRET_HOST!;

    const expiresIn =
      type === "access"
        ? process.env.ACCESS_TOKEN_EXPIRES!
        : process.env.REFRESH_TOKEN_EXPIRES!;

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
      
      return jwt.sign({ exp, userId, orgId }, secret);
    // return jwt.sign({ exp: expiresIn, userId, orgId }, secret);np
  }

  async generateAccessToken(hostId: number, orgId: number): Promise<string> {
    return this.generateToken(hostId, orgId, "access");
  }

  async generateRefreshToken(hostId: number, orgId: number): Promise<string> {
    // const decoded = await this.verifyRefreshToken(hostToken.token); // can i use this before this stage? or change something else?
    const token = this.generateToken(hostId, orgId, "refresh");
    const result = await this.tokenRepository.storeRefreshToken(
      new HostToken(0, hostId, token, new Date(), new Date())
    );

    return result.token;
  }

  async verifyAccessToken(
    token: string
  ): Promise<{ userId: number; orgId: number } | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_HOST!
      ) as {
        userId: number;
        orgId: number;
      };
      return decoded;
    } catch {
      return null;
    }
  }

  async verifyRefreshToken(
    token: string
  ): Promise<{ userId: number; orgId: number } | null> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET_HOST!
      ) as {
        userId: number;
        orgId: number;
      };
      return decoded;
    } catch {
      return null;
    }
  }

  async revokeRefreshToken(userId: number): Promise<boolean> {
    return await this.tokenRepository.deleteRefreshToken(userId);
  }
}
