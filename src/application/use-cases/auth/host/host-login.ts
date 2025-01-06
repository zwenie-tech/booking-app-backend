import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";

export class HostLoginUseCase {
  constructor(private hostTokenService: HostTokenServiceRepository) {}
  async execute(
    userId: number,
    orgId: number
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> {
    const accessToken = await this.hostTokenService.generateAccessToken(userId, orgId);
    const refreshToken = await this.hostTokenService.generateRefreshToken(userId, orgId);
    return {
      accessToken,
      refreshToken,
    };
  }
}
