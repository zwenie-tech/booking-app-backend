// Todo

// 1. Login
// 2. logout
// 3. refresh
// 4. forgot password

import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";

export class AuthRouter {
  private router: Router;
  constructor(private authController: AuthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/login", (req, res, next) =>
      this.authController.loginUser(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
