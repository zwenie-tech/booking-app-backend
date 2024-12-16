import { Router } from "express";
import { HostController } from "../controllers/host-controller";

export class HostRouter {
  private router: Router;
  constructor(
    private hostController: HostController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", (req, res, next) =>
      this.hostController.createHost(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}