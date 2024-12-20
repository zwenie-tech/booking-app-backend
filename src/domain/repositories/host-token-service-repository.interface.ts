import { HostToken } from "../entities/host-token.entitiy";

export interface HostTokenServiceRepository {
  generateAccessToken(hostId: number): Promise<string>;
  generateRefreshToken(hostToken: HostToken): Promise<string>;
  verifyAccessToken(token: string): Promise<number | null>;
  verifyRefreshToken(token: string): Promise<number | null>;
  revokeRefreshToken(userId: number): Promise<void>;
}
