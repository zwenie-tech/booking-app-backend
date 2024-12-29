import { genSalt, hash, compare } from "bcrypt";
import { logger } from "./logger";
import { config } from "./constants/app-constants";
import { ZodError } from "zod";
import crypto from "crypto";

export class Util {
  private saltRound: number;
  constructor() {
    this.saltRound = config.saltRound;
  }
  async hashPassword(password: string): Promise<string | null> {
    try {
      const salt = await genSalt(this.saltRound);
      const hashedPassword = await hash(password, salt);
      return hashedPassword;
    } catch (err: any) {
      logger.error(`Something went wrong ${err.message}`);
      return null;
    }
  }

  async compareHash(password: string, hash: string): Promise<boolean | null> {
    try {
      const isMatch = await compare(password, hash);
      return isMatch;
    } catch (err: any) {
      logger.error(`Something went wrong ${err.message}`);
      return null;
    }
  }

  handleValidationError(error: ZodError): { field: string; message: string }[] {
    const formattedErrors = error.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return formattedErrors;
  }

  randomImageName() {
    return crypto.randomBytes(32).toString("hex");
  }
}

export const util = new Util();
