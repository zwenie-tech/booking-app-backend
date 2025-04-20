import { NextFunction, Request, Response } from "express";
import { GetEventUseCase } from "../../../../application/use-cases/event/get-event";
import { AppRequest } from "../../../../shared/types";
import { CreateEventValidate } from "../../../validators/event-schema";
import { CreateEventUseCase } from "../../../../application/use-cases/event/create-event";
import { util } from "../../../../shared/utils/common";

export class EventController {
  constructor(private getEventUseCase: GetEventUseCase, private createEventUseCase: CreateEventUseCase) {}
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

  async createEvent(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const hostId = req.hostId;
    const orgId = req.orgId;
    const { 
      name, shortDescription, startDate, endDate, type, status, mode, categoryId, description, 
      location, address, meetLink, coverPhoto
    } = req.body;
    const result = CreateEventValidate.safeParse({
      name, shortDescription, startDate: new Date(startDate), endDate: new Date(endDate), type, status,
      mode, categoryId, description, location, address, meetLink, coverPhoto
    });
    if (result.success) {
      if (orgId && hostId) {
        try {
          const event = await this.createEventUseCase.execute(
            orgId, name, shortDescription, startDate, endDate, type, status, mode, categoryId, description, 
            location, address, meetLink, coverPhoto
          );
          if (event) {
            res.status(201).json({
                success: true,
                message: "Event created successfully.",
                data: {
                  eventId: event.id
                },
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Event creation failed.",
            });
          }
        } catch (error) {
          res.status(403);
          next(error);
        }
      } else {
        res.status(409).json({
          success: false,
          message: "Organization or Host didnt found",
        });
      }
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  }
}
