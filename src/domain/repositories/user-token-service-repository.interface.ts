import { UserToken } from "../entities/user-token.entitiy";

export interface UserTokenServiceRepository {
  generateAccessToken(userId: number): Promise<string>;
  generateRefreshToken(hostToken: UserToken): Promise<string>;
  verifyAccessToken(token: string): Promise<number | null>;
  verifyRefreshToken(token: string): Promise<number | null>;
  revokeRefreshToken(userId: number): Promise<boolean>;
}
