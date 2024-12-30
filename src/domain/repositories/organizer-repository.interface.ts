import { Organizer } from "../entities/organizer.entity";

export interface OrganizerRepository {
  create(organizer: Organizer): Promise<Organizer | null>;
  findById(orgId: number): Promise<Organizer | null>;
}
