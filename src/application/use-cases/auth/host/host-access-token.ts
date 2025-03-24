import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";

export class HostRefreshTokenUseCase {
  constructor(private hostTokenService: HostTokenServiceRepository) {}
  async execute(refreshToken: string): Promise<string | null> {
    const decoded = await this.hostTokenService.verifyRefreshToken(
      refreshToken
    );
    if (decoded) {
      const accessToken = await this.hostTokenService.generateAccessToken(
        decoded.userId,
        decoded.orgId
      );
      return accessToken;
    } else {
      return null;
    }
  }
}
