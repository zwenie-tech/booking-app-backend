import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { AuthMiddleware } from "../middlewares/auth";

export class UserRouter {
  private router: Router;
  constructor(
    private userController: UserController,
    private authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", (req, res, next) =>
      this.userController.createUser(req, res, next)
    );
    this.router.get("/me", this.authMiddleware.userAuth, (req, res, next) =>
      this.userController.getUser(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
