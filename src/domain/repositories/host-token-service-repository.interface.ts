import { HostToken } from "../entities/host-token.entitiy";

export interface HostTokenServiceRepository {
  generateAccessToken(hostToken: HostToken): Promise<string>;
  generateRefreshToken(hostToken: HostToken): Promise<string>;
  verifyAccessToken(token: string): Promise<string | null>;
  verifyRefreshToken(token: string): Promise<string | null>;
  revokeRefreshToken(userId: number): Promise<void>;
}
