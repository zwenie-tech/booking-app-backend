import { HostToken } from "../entities/host-token.entitiy";

export interface HostTokenRepository {
  storeRefreshToken(hostToken: HostToken): Promise<HostToken>;
  getRefreshToken(userId: number): Promise<HostToken | null>;
  deleteRefreshToken(userId: number): Promise<void>;
}