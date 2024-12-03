import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../../../application/use-cases/user/get-user";
import { ZodError } from "zod";
import {
  LoginValidate,
  UserRegisterValidate,
} from "../../../validators/auth-schema";
import { CreateUserUseCase } from "../../../../application/use-cases/user/create-user";
import { util } from "../../../../shared/utils/common";

export class AuthController {
  constructor(
    private getUserUseCase: GetUserUseCase,
    private createUserUseCase: CreateUserUseCase
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
    if (result.success) {
      try {
        const user = await this.createUserUseCase.execute(
          firstName,
          lastName,
          email,
          phone,
          password
        );
        if (user) {
          res.status(201).json({
            success: true,
            data: user,
          });
        } else {
          res.status(409).json({
            success: false,
            message: "User already exist with email or phone number",
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

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    const result = LoginValidate.safeParse({ username, password });
    if (result.success) {
    } else {
      const formattedErrors = util.handleValidationError(result.error);
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    try {
      const user = await this.getUserUseCase.findByCredentials(
        username,
        password
      );
      if (user) {
        res.status(200).json({
          message: "You have successfully logged in.",
          success: true,
          data: user,
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
  }
}
