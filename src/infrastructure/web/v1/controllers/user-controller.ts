import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../../application/use-cases/user/create-user";
import { ZodError } from "zod";
import { util } from "../../../../shared/utils/common";
import { UserRegisterValidate } from "../../../validators/user-schema";
import { UserLoginUseCase } from "../../../../application/use-cases/auth/user/user-login";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase, private userLoginUseCase: UserLoginUseCase) {}
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
            try{
              const token = await this.userLoginUseCase.execute(user.id);
              res.status(201).json({
                success: true,
                data: {
                  userId: user.id,
                  accessToken: token?.accessToken,
                  refreshToken: token?.refreshToken,
                },
              });
            } catch(err) {
              res.status(301);
              next(err);
            }

            
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
  async getUser(
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
      res.status(400).json({
        message: "This is test end point, don't be an idiot!!",
      });
    } else {
      if (result.error instanceof ZodError) {
        const formattedErrors = result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: formattedErrors,
        });
      } else {
        res.status(400);
        next(result.error);
      }
    }
  }
}
