import { Organizer } from "../../../domain/entities/organizer.entity";
import { OrganizerRepository } from "../../../domain/repositories/organizer-repository.interface";

export class CreateOrganizationUseCase {
  constructor(private organizerRepository: OrganizerRepository) {}
  async execute(
    name: string,
    address: string,
    website: string,
    logo: string,
    about: string,
    facebook: string,
    instagram: string,
    x: string
  ): Promise<Organizer | null> {
    const org = new Organizer(
      1,
      name,
      address,
      website,
      logo,
      about,
      facebook,
      instagram,
      x,
      new Date(),
      new Date()
    );
    return this.organizerRepository.create(org);
  }
}
