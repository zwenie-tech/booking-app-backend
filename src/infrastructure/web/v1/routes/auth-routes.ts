import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

export class AuthRouter {
  private router: Router;
  constructor(private authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/login/user", (req, res, next) =>
      this.authController.loginUser(req, res, next)
    );
    this.router.post("/register/user", (req, res, next) =>
      this.authController.createUser(req, res, next)
    );
    this.router.post("/login/host", (req, res, next) =>
      this.authController.loginHost(req, res, next)
    );
    this.router.post("/register/host", (req, res, next) => 
      this.authController.createHost(req, res, next)
    )
  }

  public getRouter(): Router {
    return this.router;
  }
}
