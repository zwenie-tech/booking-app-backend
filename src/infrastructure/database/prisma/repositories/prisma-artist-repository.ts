import { PrismaClient } from "@prisma/client";
import { Artist } from "../../../../domain/entities/artist.entitiy";
import { ArtistRepository } from "../../../../domain/repositories/artist-repository.interface";

export class PrismaArtistRepository implements ArtistRepository {
  constructor(private prisma: PrismaClient) {}
  async getArtistByEventId(eventId: number): Promise<Artist[] | null> {
    const artist = await this.prisma.artist.findMany({
      where: {
        eventId,
      },
    });
    if (artist) {
      return artist;
    }
    return null;
  }
}
