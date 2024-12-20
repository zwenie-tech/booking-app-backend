import { HostToken } from "../../../../domain/entities/host-token.entitiy";
import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";

export class HostLoginUseCase {
  constructor(private hostTokenService: HostTokenServiceRepository) {}
  async execute(userId: number): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> {
    const hostToken = new HostToken(0, userId, "", new Date(), new Date());
    const accessToken = await this.hostTokenService.generateAccessToken(
      userId
    );
    const refreshToken = await this.hostTokenService.generateRefreshToken(
      hostToken
    );
    return {
      accessToken,
      refreshToken,
    };
  }
}
