import { HostToken } from "../../../../domain/entities/host-token.entitiy";
import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";

export class HostRefreshTokenUseCase {
  constructor(private hostTokenService: HostTokenServiceRepository) {}
  async execute(hostId: number): Promise<string | null> {
    const hostToken = new HostToken(0, hostId, "", new Date(), new Date());
    const refreshToken = await this.hostTokenService.generateRefreshToken(
      hostToken
    );
    return refreshToken;
  }
}
