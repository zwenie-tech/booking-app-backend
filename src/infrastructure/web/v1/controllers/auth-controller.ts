import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../../../application/use-cases/user/get-user";
import { LoginValidate } from "../../../validators/auth-schema";
import { util } from "../../../../shared/utils/common";
import { GetHostUseCase } from "../../../../application/use-cases/host/get-host";
import { HostLoginUseCase } from "../../../../application/use-cases/auth/host/host-login";
import { HostLogoutUseCase } from "../../../../application/use-cases/auth/host/host-logout";
import { HostRefreshTokenUseCase } from "../../../../application/use-cases/auth/host/host-refresh-token";
import { UserLoginUseCase } from "../../../../application/use-cases/auth/user/user-login";
import { UserLogoutUseCase } from "../../../../application/use-cases/auth/user/user-logout";
import { UserRefreshTokenUseCase } from "../../../../application/use-cases/auth/user/user-refresh-token";

export class AuthController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private userLogoutUseCase: UserLogoutUseCase,
    private userRefreshTokenUseCase: UserRefreshTokenUseCase,
    private getHostUseCase: GetHostUseCase,
    private hostLoginUseCase: HostLoginUseCase,
    private hostLogoutUseCase: HostLogoutUseCase,
    private hostRefreshTokenUseCase: HostRefreshTokenUseCase
  ) {}

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    const result = LoginValidate.safeParse({ username, password });
    const hashedPassword = await util.hashPassword(password);
    if (result.success) {
      if (hashedPassword)
        try {
          const user = await this.getUserUseCase.findByCredentials(
            username,
            hashedPassword
          );
          if (user) {
            try {
              const token = await this.userLoginUseCase.execute(user.id);
              res.status(200).json({
                message: "You have successfully logged in.",
                success: true,
                data: {
                  userId: user.id,
                  accessToken: token?.accessToken,
                  refreshToken: token?.refreshToken,
                },
              });
            } catch (err) {
              res.status(402);
              next(err);
            }
          } else {
            res.status(401).json({
              success: false,
              message: "Login failed. Check your credentials and try again.",
            });
          }
        } catch (error: any) {
          res.status(400);
          next(error);
        }
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  }

  async userRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async logoutUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async loginHost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    const result = LoginValidate.safeParse({ username, password });
    const hashedPassword = await util.hashPassword(password);
    if (result.success) {
      if (hashedPassword)
        try {
          const user = await this.getUserUseCase.findByCredentials(
            username,
            hashedPassword
          );
          if (user) {
            res.status(200).json({
              message: "You have successfully logged in.",
              success: true,
              data: {
                userId: user.id,
                accessToken: "",
                refreshToken: "",
              },
            });
          } else {
            res.status(401).json({
              success: false,
              message: "Login failed. Check your credentials and try again.",
            });
          }
        } catch (error: any) {
          res.status(400);
          next(error);
        }
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  }

  async hostRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async logoutHost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
