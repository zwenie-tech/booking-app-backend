import { Host } from "../../../domain/entities/host.entitiy";
import { HostRepository } from "../../../domain/repositories/host-repository.interface";

export class GetHostUseCase {
    constructor(private hostRepository: HostRepository) {}
  
    async execute(id: number): Promise<Host | null> {
      return this.hostRepository.findById(id);
    }
  
    async findByCredentials(
      username: string,
      password: string
    ): Promise<Host | null> {
      return this.hostRepository.findByCredentials(username, password);
    }
  
    async findByUsername(username: string): Promise<Host | null> {
      return this.hostRepository.findByUsername(username);
    }
  }