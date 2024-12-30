import { Host } from "../../../domain/entities/host.entitiy";
import { HostRepository } from "../../../domain/repositories/host-repository.interface";

export class UpdateHostUseCase {
  constructor(private hostRepository: HostRepository) {}
  async execute(hostId: number, orgId: number): Promise<Host | null> {
    return this.hostRepository.updateOrgById(orgId, hostId);
  }
}
