import { NextFunction, Request, Response } from "express";
import { logger } from "../../../../shared/utils/logger";

class Middleware {
  async handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const responseBody = {
      success: false,
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? "🪲🔥😱" : err.stack,
    };
    logger.error(JSON.stringify(responseBody));
    res.json(responseBody);
  }

  async pageNotFound(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    logger.error("Looks like this page is lost in the void. 🚀💫");
    res.status(404).json({
      success: false,
      message: "Looks like this page is lost in the void. 🚀💫",
    });
  }
}

export const middleware = new Middleware();
