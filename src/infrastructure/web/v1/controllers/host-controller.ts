import { CreateHostUseCase } from "../../../../application/use-cases/host/create-host";
import { util } from "../../../../shared/utils/common";
import { NextFunction, Request, Response } from "express";
import { UserRegisterValidate } from "../../../validators/user-schema";

export class HostController {
  constructor(private createHostUseCase: CreateHostUseCase) {}

  async createHost(
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
          const user = await this.createHostUseCase.execute(
            firstName,
            lastName,
            email,
            phone,
            hashedPassword
          );
          if (user) {
            res.status(201).json({
              success: true,
              data: {
                userId: user.id,
                accessToken: "",
                refreshToken: "",
              },
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
}
