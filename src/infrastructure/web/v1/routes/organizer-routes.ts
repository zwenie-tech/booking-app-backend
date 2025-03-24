import { Router } from "express";
import { OrganizerController } from "../controllers/organizer-controller";
import { AuthMiddleware } from "../middlewares/auth";

export class OrganizerRoutes {
  private router: Router;
  constructor(
    private organizerController: OrganizerController,
    private authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post("/register",this.authMiddleware.hostAuth, (req, res, next) =>
      this.organizerController.createOrganizer(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
