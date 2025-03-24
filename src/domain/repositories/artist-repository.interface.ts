import { Artist } from "../entities/artist.entitiy";

export interface ArtistRepository {
  getArtistByEventId(eventId: number): Promise<Artist[] | null>;
}
