import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../../../application/use-cases/user/get-user";
import {
  LoginValidate,
  RefreshTokenValidate,
} from "../../../validators/auth-schema";
import { util } from "../../../../shared/utils/common";
import { GetHostUseCase } from "../../../../application/use-cases/host/get-host";
import { HostLoginUseCase } from "../../../../application/use-cases/auth/host/host-login";
import { HostLogoutUseCase } from "../../../../application/use-cases/auth/host/host-logout";
import { HostRefreshTokenUseCase } from "../../../../application/use-cases/auth/host/host-access-token";
import { UserLoginUseCase } from "../../../../application/use-cases/auth/user/user-login";
import { UserLogoutUseCase } from "../../../../application/use-cases/auth/user/user-logout";
import { UserAccessTokenUseCase } from "../../../../application/use-cases/auth/user/user-access-token";
import { AppResponse } from "../../../../shared/types";

export class AuthController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private userLogoutUseCase: UserLogoutUseCase,
    private userRefreshTokenUseCase: UserAccessTokenUseCase,
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
    if (result.success) {
      try {
        const user = await this.getUserUseCase.findByUsername(username);
        if (user) {
          try {
            const isMatch = await util.compareHash(password, user.password);
            if (isMatch) {
              try {
                const token = await this.userLoginUseCase.execute(user.id);
                res.cookie('token', token?.accessToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: 7 * 60 * 1000
                });
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
              res.status(403).json({
                success: false,
                message: "Invalid password",
              });
            }
          } catch (error) {
            res.status(402);
            next(error);
          }
        } else {
          res.status(401).json({
            success: false,
            message: "User not found with username",
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
  ): Promise<void> {
    const { refreshToken } = req.body;
    const result = RefreshTokenValidate.safeParse({ refreshToken });
    if (result.success) {
      try {
        const accessToken = await this.userRefreshTokenUseCase.execute(
          refreshToken
        );
        if(accessToken) {
          res.status(200).json({
            success: true,
            message: "Your access token has been successfully regenerated",
            data: {
              accessToken,
              refreshToken,
            },
          });
        } else {
          res.status(403).json({
            success: false,
            message: "Invalid refresh token."
          })
        }
        
      } catch (error) {
        res.status(403);
        next(error);
      }
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(403).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  }

  async logoutUser(
    req: Request,
    res: AppResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.userLogoutUseCase.execute(res.userId!);
      if (user) {
        res.status(200).json({
          success: true,
          message: "User logout",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }

  async loginHost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    const result = LoginValidate.safeParse({ username, password });
    if (result.success) {
      try {
        const user = await this.getHostUseCase.findByUsername(username);
        if (user) {
          try {
            const isMatch = await util.compareHash(password, user.password);
            if (isMatch) {
              try {
                const token = await this.hostLoginUseCase.execute(user.id, user.orgId);
                res.cookie('token', token?.accessToken, {
                  httpOnly: true,
                  secure: true,
                  maxAge: 7 * 60 * 1000
                });
                res.status(200).json({
                  success: true,
                  message: "You have successfully logged in.",
                  data: {
                    hostId: user.id,
                    orgId: user.orgId,
                    accessToken: token?.accessToken,
                    refreshToken: token?.refreshToken,
                  },
                });
              } catch (error) {
                res.status(402);
                next(error);
              }
            } else {
              res.status(403).json({
                success: false,
                message: "Invalid password",
              });
            }
          } catch (error) {
            res.status(403);
            next(error);
          }
        } else {
          res.status(401).json({
            success: false,
            message: "Host not found with username",
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
  ): Promise<void> {
    const { refreshToken } = req.body;
    const result = RefreshTokenValidate.safeParse({ refreshToken });
    if (result.success) {
      try {
        const accessToken = await this.hostRefreshTokenUseCase.execute(
          refreshToken
        );
        if(accessToken) {
          res.status(200).json({
            success: true,
            message: "Your access token has been successfully regenerated",
            data: {
              accessToken,
              refreshToken,
            },
          });
        } else {
          res.status(403).json({
            success: false,
            message : "Invalid refresh token."
          })
        }
       
      } catch (error) {
        res.status(401);
        next(error);
      }
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(403).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
  }

  async logoutHost(
    req: Request,
    res: AppResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const host = await this.hostLogoutUseCase.execute(res.hostId!);
      if (host) {
      } else {
        res.status(403).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
    } catch (error) {
      res.status(402);
      next(error);
    }
  }

  async forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.status(200).json({
      success: true,
      message: "I am working on it!",
    });
  }
}
