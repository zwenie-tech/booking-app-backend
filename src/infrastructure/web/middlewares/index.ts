import { NextFunction, Request, Response } from "express";
import { logger } from "../../logger";

class Middleware {
  handleError(err: any, req: Request, res: Response, next: NextFunction) {
    const responseBody = {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? "🪲🔥😱" : err.stack,
    };
    logger.error(JSON.stringify(responseBody));
    res.json(responseBody);
  }

  pageNotFound(req: Request, res: Response, next: NextFunction) {
    logger.error('Looks like this page is lost in the void. 🚀💫');
    res.status(404).json({
      message : 'Looks like this page is lost in the void. 🚀💫'
    });
  }
}

export const middleware = new Middleware();