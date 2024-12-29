import { NextFunction, Request, Response } from "express";
import { AppRequest } from "../../../../shared/types";
import { ImageFileValidate } from "../../../validators/upload-schema";

export class FileController {
  constructor() {}
  async uploadFile(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const hostId = req.hostId
    if(req.file) {
        const type = req.file.mimetype;
        const size = req.file.size;
        const result = ImageFileValidate.safeParse({type, size});
        if(result.success) {
          res.status(200).json({
            test : "Good."
        })
        } else {
          res.status(200).json({
            test : "bad.",
            Error: result.error
        })
        }
        console.log(req.file);
       
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
