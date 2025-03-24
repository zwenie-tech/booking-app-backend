import { NextFunction, Request, Response } from "express";
import { GetArtistUseCase } from "../../../../application/use-cases/artist/get-artist";

export class ArtistController {
  constructor(private getArtistUseCase: GetArtistUseCase) {}
  async getArtistByEventId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;
      const artist = await this.getArtistUseCase.getArtistByEventId(
        Number(eventId)
      );
      if (artist) {
        res.status(200).json({
          success: true,
          artist,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Artist not found with event id ${eventId}`,
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }
}
