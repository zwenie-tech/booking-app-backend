import { UserToken } from "../entities/user-token.entitiy";

export interface UserTokenServiceRepository {
  generateAccessToken(hostToken: UserToken): Promise<string>;
  generateRefreshToken(hostToken: UserToken): Promise<string>;
  verifyAccessToken(token: string): Promise<string | null>;
  verifyRefreshToken(token: string): Promise<string | null>;
  revokeRefreshToken(userId: number): Promise<void>;
}
