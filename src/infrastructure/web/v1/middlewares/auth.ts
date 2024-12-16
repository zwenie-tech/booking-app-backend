import { NextFunction, Request, Response } from "express";
import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";
import { UserTokenServiceRepository } from "../../../../domain/repositories/user-token-service-repository.interface";

export class AuthMiddleware {
  private hostTokenService: HostTokenServiceRepository;
  private userTokenService: UserTokenServiceRepository;

  constructor(
    hostTokenService: HostTokenServiceRepository,
    userTokenService: UserTokenServiceRepository
  ) {
    this.hostTokenService = hostTokenService;
    this.userTokenService = userTokenService;
  }

  private splitToken(bearerToken: string): string {
    const token = bearerToken.split(" ")[1];
    return token;
  }
  async hostAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = this.splitToken(authHeader);
      try {
        const result = await this.hostTokenService.verifyAccessToken(token);
        if (result) {
          next();
        } else {
          res.status(403).json({
            success: false,
            message: "Unauthorized access",
          });
        }
      } catch (error) {
        res.status(400);
        next(error);
      }
    } else {
      res.status(401).json({
        success: false,
        message: "auth header not found",
      });
    }
  }

  async userAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = this.splitToken(authHeader);
      try {
        const result = await this.userTokenService.verifyAccessToken(token);
        if (result) {
          next();
        } else {
          res.status(403).json({
            success: false,
            message: "Unauthorized access",
          });
        }
      } catch (error) {
        res.status(400);
        next(error);
      }
    } else {
      res.status(401).json({
        success: false,
        message: "auth header not found",
      });
    }
  }
}
