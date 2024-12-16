import { UserToken } from "../entities/user-token.entitiy";

export interface UserTokenRepository {
  storeRefreshToken(userToken: UserToken): Promise<UserToken>;
  getRefreshToken(userId: number): Promise<UserToken | null>;
  deleteRefreshToken(userId: number): Promise<void>;
}