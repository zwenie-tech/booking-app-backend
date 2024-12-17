import { Host } from "../entities/host.entitiy";

export interface HostRepository {
  create(host: Host): Promise<Host | null>;
  findById(id: number): Promise<Host | null>;
  update(id: number, userData: Partial<Host>): Promise<Host | null>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Host[] | null>;
  findByUsername(username: string): Promise<Host | null>;
  findByCredentials(username: string, password: string): Promise<Host | null>;
}
