import { NextFunction, Request, Response } from "express";
import { AppRequest } from "../../../../shared/types";
import { ImageFileValidate } from "../../../validators/upload-schema";
import { UploadFileUseCase } from "../../../../application/use-cases/storage/upload-file";
import { util } from "../../../../shared/utils/common";

export class FileController {
  constructor(private fileUploadUseCase: UploadFileUseCase) {}
  async uploadFile(
    req: AppRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const hostId = req.hostId;
    if (req.file) {
      const type = req.file.mimetype;
      const size = req.file.size;
      const result = ImageFileValidate.safeParse({ type, size });
      if (result.success) {
        try {
          const key = util.randomImageName();
          const url = await this.fileUploadUseCase.execute(
            req.file.buffer,
            key,
            type
          );
          res.status(201).json({
            success: true,
            message: "File uploaded.",
            data: {
              url,
            },
          });
        } catch (error) {
          res.status(503);
          next(error);
        }
      } else {
        res.status(400).json({
          message: "Validation failed.",
          Error: result.error,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "File not found.",
      });
    }
  }

  async deleteFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
