import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../../application/use-cases/user/create-user";
import { ZodError } from "zod";
import { UserRegisterValidate } from "../../../validators/auth-schema";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
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
