import { UserTokenServiceRepository } from "../../../../domain/repositories/user-token-service-repository.interface";

export class UserLogoutUseCase {
  constructor(private userTokenService: UserTokenServiceRepository) {}
  async execute(userId: number): Promise<void> {
    this.userTokenService.revokeRefreshToken(userId);
  }
}
