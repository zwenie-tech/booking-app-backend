import { User } from "../../../domain/entities/user.entitiy";
import { UserRepository } from "../../../domain/repositories/user-repository.interface";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByCredentials(
    username: string,
    password: string
  ): Promise<User | null> {
    return this.userRepository.findByCredentials(username, password);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
