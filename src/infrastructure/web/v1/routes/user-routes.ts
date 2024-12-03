import { Router } from "express";
import { UserController } from "../controllers/user-controller";

export class UserRouter {
  private router: Router;
  constructor(private userController: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/:id", (req, res, next) =>
      this.userController.getUser(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
