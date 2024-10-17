import { User } from "../../../domain/entities/user.entitiy";
import { UserRepository } from "../../../domain/repositories/user-repository.interface";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): Promise<User | null> {
    const user = new User(
      0,
      firstName,
      lastName,
      email,
      phone,
      "",
      false,
      null,
      password,
      new Date()
    );
    return await this.userRepository.create(user);
  }
}
