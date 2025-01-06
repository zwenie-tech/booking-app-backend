export interface HostTokenServiceRepository {
  generateAccessToken(hostId: number, orgId: number): Promise<string>;
  generateRefreshToken(hostId: number, orgId: number): Promise<string>;
  verifyAccessToken(
    token: string
  ): Promise<{ userId: number; orgId: number } | null>;
  verifyRefreshToken(
    token: string
  ): Promise<{ userId: number; orgId: number } | null>;
  revokeRefreshToken(userId: number): Promise<boolean>;
}
