import { Router } from "express";
import { EventController } from "../controllers/event-controller";
import { AuthMiddleware } from "../middlewares/auth";
import { ArtistController } from "../controllers/artist-controller";
import { EventGalleryController } from "../controllers/event-gallery-controller";

export class EventRouter {
  private router: Router;
  constructor(
    private eventController: EventController,
    private artistController: ArtistController,
    private eventGalleryController: EventGalleryController,
    private authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.authMiddleware.userAuth, (req, res, next) =>
      this.eventController.getEvents(req, res, next)
    );
    this.router.get(
      "/popular",
      this.authMiddleware.userAuth,
      (req, res, next) => this.eventController.getPopularEvents(req, res, next)
    );
    this.router.get(
      "/featured",
      this.authMiddleware.userAuth,
      (req, res, next) => this.eventController.getFeaturedEvents(req, res, next)
    );
    this.router.get(
      "/:eventId/guest",
      this.authMiddleware.userAuth,
      (req, res, next) =>
        this.artistController.getArtistByEventId(req, res, next)
    );
    this.router.get(
      "/:eventId/gallery",
      this.authMiddleware.userAuth,
      (req, res, next) =>
        this.eventGalleryController.getEventGalleryByEventId(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
