import { genSalt, hash, compare } from "bcrypt";
import { logger } from "../infrastructure/logger";

export class Util {
  private saltRound: number;
  constructor() {
    this.saltRound = 10;
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
}

export const util = new Util();