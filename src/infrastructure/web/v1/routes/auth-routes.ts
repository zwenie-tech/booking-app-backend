import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { UserController } from "../controllers/user-controller";
import { HostController } from "../controllers/host-controller";

export class AuthRouter {
  private router: Router;
  constructor(
    private authController: AuthController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/users/login", (req, res, next) =>
      this.authController.loginUser(req, res, next)
    );
    this.router.post("/users/refresh", (req, res, next) =>
      this.authController.userRefreshToken(req, res, next)
    );
    this.router.post("/users/logout", (req, res, next) =>
      this.authController.logoutUser(req, res, next)
    );
    this.router.post("/hosts/login", (req, res, next) =>
      this.authController.loginHost(req, res, next)
    );
    this.router.post("/hosts/refresh", (req, res, next) =>
      this.authController.hostRefreshToken(req, res, next)
    );
    this.router.post("/hosts/logout", (req, res, next) =>
      this.authController.logoutHost(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
