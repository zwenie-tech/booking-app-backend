import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";

export class HostRefreshTokenUseCase {
  constructor(private hostTokenService: HostTokenServiceRepository) {}
  async execute(refreshToken: string): Promise<string | null> {
    const hostId = await this.hostTokenService.verifyRefreshToken(refreshToken);
    if (hostId) {
      const accessToken = await this.hostTokenService.generateAccessToken(
        hostId
      );
      return accessToken;
    } else {
      return null;
    }
  }
}
