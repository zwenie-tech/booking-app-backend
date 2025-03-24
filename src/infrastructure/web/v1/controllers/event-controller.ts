import { NextFunction, Request, Response } from "express";
import { GetEventUseCase } from "../../../../application/use-cases/event/get-event";

export class EventController {
  constructor(private getEventUseCase: GetEventUseCase) {}
  async getEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const events = await this.getEventUseCase.execute();
      if (events) {
        res.status(200).json({
          success: true,
          events,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Events not found.",
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }

  async getFeaturedEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const events = await this.getEventUseCase.getFeaturedEvents();
      if (events) {
        res.status(200).json({
          success: true,
          events,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Featured events not found.",
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }

  async getPopularEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const events = await this.getEventUseCase.getPopularEvents();
      if (events) {
        res.status(200).json({
          success: true,
          events,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Popular events not found",
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }
}
