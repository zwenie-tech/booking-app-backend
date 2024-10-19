import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/use-cases/user/create-user";

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, phone, password } = req.body;
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
  }
}
