import { UserTokenServiceRepository } from "../../../../domain/repositories/user-token-service-repository.interface";

export class UserAccessTokenUseCase {
  constructor(private userTokenService: UserTokenServiceRepository) {}
  async execute(userRefreshToken: string): Promise<string | null> {
    const userId = await this.userTokenService.verifyRefreshToken(userRefreshToken);
    if(userId){
      const accessToken = await this.userTokenService.generateAccessToken(
        userId
      );
      return accessToken;
    } else {
      return null;
    }
   
  }
}
