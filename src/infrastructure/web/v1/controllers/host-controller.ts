import { CreateHostUseCase } from "../../../../application/use-cases/host/create-host";
import { util } from "../../../../shared/utils/common";
import { NextFunction, Request, Response } from "express";
import { UserRegisterValidate } from "../../../validators/user-schema";
import { HostLoginUseCase } from "../../../../application/use-cases/auth/host/host-login";

export class HostController {
  constructor(
    private createHostUseCase: CreateHostUseCase,
    private hostLoginUseCase: HostLoginUseCase
  ) {}

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
            try {
              const token = await this.hostLoginUseCase.execute(user.id);
              res.status(201).json({
                success: true,
                data: {
                  userId: user.id,
                  accessToken: token?.accessToken,
                  refreshToken: token?.refreshToken,
                },
              });
            } catch (err) {
              res.status(302);
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
}
