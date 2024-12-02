import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../../application/use-cases/user/create-user";
import { UserRegisterValidate } from "../../../validators/user-schema";
import { ZodError } from "zod";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, phone, password } = req.body;
    const result = UserRegisterValidate.safeParse({firstName, lastName, email, phone});
    if(result.success) {
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
      if(result.error instanceof ZodError) {
        const formattedErrors = result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message
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
