import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";

export class HostLogoutUseCase {
    constructor(private hostTokenService: HostTokenServiceRepository){}
    async execute(hostId: number): Promise<void> {
        this.hostTokenService.revokeRefreshToken(hostId);
    }
}