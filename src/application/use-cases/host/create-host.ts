import { Host } from "../../../domain/entities/host.entitiy";
import { HostRepository } from "../../../domain/repositories/host-repository.interface";

export class CreateUserUseCase {
  constructor(private hostRepository: HostRepository) {}
  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Promise<Host | null> {
    const host = new Host(
      0,
      firstName,
      lastName,
      email,
      phone,
      "",
      1,
      "admin",
      false,
      new Date(),
      password,
      new Date()
    );
    return await this.hostRepository.create(host);
  }
}
