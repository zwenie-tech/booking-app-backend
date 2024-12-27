import { NextFunction, Request, Response } from "express";

export class FileUploadController {
  constructor() {}
  async uploadFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    if(req.file) {

    } else {
        res.status(403).json({
            success: false,
            message: "File not found."
        })
    }
  }

  async deleteFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

  }
}
