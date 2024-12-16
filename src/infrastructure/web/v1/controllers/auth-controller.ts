import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../../../application/use-cases/user/get-user";
import { LoginValidate } from "../../../validators/auth-schema";
import { util } from "../../../../shared/utils/common";

export class AuthController {
  constructor(
    private getUserUseCase: GetUserUseCase
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
