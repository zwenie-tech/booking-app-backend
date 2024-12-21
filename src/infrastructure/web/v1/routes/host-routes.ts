import { Router } from "express";
import { HostController } from "../controllers/host-controller";
import { AuthMiddleware } from "../middlewares/auth";

export class HostRouter {
  private router: Router;
  constructor(
    private hostController: HostController,
    private authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", (req, res, next) =>
      this.hostController.createHost(req, res, next)
    );
    this.router.get("/me", this.authMiddleware.hostAuth, (req, res, next) =>
      this.hostController.getHost(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
