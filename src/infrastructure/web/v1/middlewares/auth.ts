import { NextFunction, Response } from "express";
import { HostTokenServiceRepository } from "../../../../domain/repositories/host-token-service-repository.interface";
import { UserTokenServiceRepository } from "../../../../domain/repositories/user-token-service-repository.interface";
import { AppRequest } from "../../../../shared/types";

export class AuthMiddleware {
  private hostTokenService: HostTokenServiceRepository;
  private userTokenService: UserTokenServiceRepository;

  constructor(
    hostTokenService: HostTokenServiceRepository,
    userTokenService: UserTokenServiceRepository
  ) {
    this.hostTokenService = hostTokenService;
    this.userTokenService = userTokenService;
    this.hostAuth = this.hostAuth.bind(this);
    this.userAuth = this.userAuth.bind(this);
  }

  async hostAuth(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = req.headers;
    if (authorization) {
      try {
        const token = authorization.replace("Bearer ", "");
        const result = await this.hostTokenService.verifyAccessToken(token);
        if (result) {
          req.hostId = result;
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
    req: AppRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { authorization } = req.headers;
    if (authorization) {
      try {
        const token = authorization.replace("Bearer ", "");
        const result = await this.userTokenService.verifyAccessToken(token);
        if (result) {
          req.userId = result;
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
