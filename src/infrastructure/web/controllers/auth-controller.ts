//    Todo
//     [x] login
//     [x] logout
//     [x] refresh
//     [x] forgot password

import { NextFunction, Request, Response } from "express";
import { GetUserUseCase } from "../../../application/use-cases/user/get-user";

export class AuthController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await this.getUserUseCase.findByUnique(username, password);
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
