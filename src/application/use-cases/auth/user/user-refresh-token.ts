import { UserToken } from "../../../../domain/entities/user-token.entitiy";
import { UserTokenServiceRepository } from "../../../../domain/repositories/user-token-service-repository.interface";

export class UserRefreshTokenUseCase {
  constructor(private userTokenService: UserTokenServiceRepository) {}
  async execute(userId: number): Promise<string | null> {
    const hostToken = new UserToken(0, userId, "", new Date(), new Date());
    const refreshToken = await this.userTokenService.generateRefreshToken(
      hostToken
    );
    return refreshToken;
  }
}
