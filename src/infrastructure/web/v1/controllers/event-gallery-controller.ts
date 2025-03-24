import { NextFunction, Request, Response } from "express";
import { GetEventGalleryUseCase } from "../../../../application/use-cases/gallery/get-gallery";

export class EventGalleryController {
  constructor(private getEventGalleryUseCase: GetEventGalleryUseCase) {}
  async getEventGalleryByEventId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { eventId } = req.params;
      const artists =
        await this.getEventGalleryUseCase.getEventGalleryByEventId(
          Number(eventId)
        );
      if (artists) {
        res.status(200).json({
          success: true,
          artists,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Artist Not found with event id ${eventId}`,
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }
}
