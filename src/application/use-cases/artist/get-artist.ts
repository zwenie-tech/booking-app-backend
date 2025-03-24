import { Artist } from "../../../domain/entities/artist.entitiy";
import { ArtistRepository } from "../../../domain/repositories/artist-repository.interface";

export class GetArtistUseCase{
    constructor(private artistRepository: ArtistRepository){}
    async getArtistByEventId(eventId: number): Promise<Artist[] | null>{
        return this.artistRepository.getArtistByEventId(eventId);
    }
}