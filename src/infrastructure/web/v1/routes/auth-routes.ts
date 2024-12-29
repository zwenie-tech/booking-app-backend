import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { AuthMiddleware } from "../middlewares/auth";
import { PrismaHostTokenRepository } from "../../../database/prisma/repositories/prisma-host-token.repository";
import { PrismaUserTokenRepository } from "../../../database/prisma/repositories/prisma-user-token-repository";
import { PrismaClient } from "@prisma/client";
import { UserTokenService } from "../../../services/jwt/user-token-service";
import { HostTokenService } from "../../../services/jwt/host-token-service";

export class AuthRouter {
  private router: Router;
  constructor(
    private authController: AuthController,
    private authMiddleware: AuthMiddleware
  ) {
    this.router = Router();
    this.initializeRoutes();

    // Prisma Repositories
    const prisma = new PrismaClient();
    const hostTokenRepository = new PrismaHostTokenRepository(prisma);
    const userTokenRepository = new PrismaUserTokenRepository(prisma);

    // Service repository
    const userTokenServiceRepository = new UserTokenService(
      userTokenRepository
    );
    const hostTokenServiceRepository = new HostTokenService(
      hostTokenRepository
    );
    this.authMiddleware = new AuthMiddleware(
      hostTokenServiceRepository,
      userTokenServiceRepository
    );
  }

  private initializeRoutes(): void {
    this.router.post("/users/login", (req, res, next) =>
      this.authController.loginUser(req, res, next)
    );
    this.router.post("/users/refresh", (req, res, next) =>
      this.authController.userRefreshToken(req, res, next)
    );
    this.router.post(
      "/users/logout",
      this.authMiddleware.userAuth,
      (req, res, next) => this.authController.logoutUser(req, res, next)
    );
    this.router.post("/hosts/login", (req, res, next) =>
      this.authController.loginHost(req, res, next)
    );
    this.router.post("/hosts/refresh", (req, res, next) =>
      this.authController.hostRefreshToken(req, res, next)
    );
    this.router.post(
      "/hosts/logout",
      this.authMiddleware.hostAuth,
      (req, res, next) => this.authController.logoutHost(req, res, next)
    );
    this.router.post("/users/forgot", (req, res, next) =>
      this.authController.forgetPassword(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
