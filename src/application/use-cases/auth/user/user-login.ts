import { UserToken } from "../../../../domain/entities/user-token.entitiy";
import { UserTokenServiceRepository } from "../../../../domain/repositories/user-token-service-repository.interface";

export class UserLoginUseCase {
  constructor(private userTokenService: UserTokenServiceRepository) {}
  async execute(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> {
    const hostToken = new UserToken(0, userId, "", new Date(), new Date());
    const accessToken = await this.userTokenService.generateAccessToken(
      hostToken
    );
    const refreshToken = await this.userTokenService.generateRefreshToken(
      hostToken
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
