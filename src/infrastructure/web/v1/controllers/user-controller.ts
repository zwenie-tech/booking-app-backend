import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../../application/use-cases/user/create-user";
import { util } from "../../../../shared/utils/common";
import { UserRegisterValidate } from "../../../validators/user-schema";
import { UserLoginUseCase } from "../../../../application/use-cases/auth/user/user-login";
import { GetUserUseCase } from "../../../../application/use-cases/user/get-user";
import { AppResponse } from "../../../../shared/types";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private userLoginUseCase: UserLoginUseCase,
    private getUserUseCase: GetUserUseCase
  ) {}
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, phone, password } = req.body;
    const result = UserRegisterValidate.safeParse({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    const hashedPassword = await util.hashPassword(password);
    if (result.success) {
      if (hashedPassword)
        try {
          const user = await this.createUserUseCase.execute(
            firstName,
            lastName,
            email,
            phone,
            hashedPassword
          );
          if (user) {
            try {
              const token = await this.userLoginUseCase.execute(user.id);
              res.cookie("token", token?.accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 60 * 1000,
              });
              res.status(201).json({
                success: true,
                data: {
                  userId: user.id,
                  isVerified: user.isVerified,
                  accessToken: token?.accessToken,
                  refreshToken: token?.refreshToken,
                },
              });
            } catch (err) {
              res.status(500);
              next(err);
            }
          } else {
            res.status(409).json({
              success: false,
              message: "User already exist with email or phone number",
            });
          }
        } catch (error: any) {
          res.status(503);
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

  async getUser(
    req: Request,
    res: AppResponse,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await this.getUserUseCase.execute(res.userId!);
      if (user) {
        res.status(200).json({
          success: true,
          data: {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            profile: user.profile,
            isVerified: user.isVerified,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found with id",
        });
      }
    } catch (error) {
      res.status(503);
      next(error);
    }
  }
}
