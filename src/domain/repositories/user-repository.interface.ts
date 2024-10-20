import { User } from "../entities/user.entitiy";

export interface UserRepository {
  create(user: User): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(id: number, userData: Partial<User>): Promise<User | null>,
  delete(id: number): Promise<void>,
  findAll(): Promise<User[] | null>,
  findByUsername(username: string) : Promise<User | null>,
  findByCredentials(username : string, password: string) : Promise<User | null>,
}
