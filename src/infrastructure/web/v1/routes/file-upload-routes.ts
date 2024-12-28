import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { FileUploadController } from "../controllers/file-upload-controller";
import { FileUploader } from "../../../../config/multer";

export class FileUploadRouter {
  private router: Router;
  constructor(
    private authMiddleware: AuthMiddleware,
    private fileUploadController: FileUploadController,
    private fileUploader: FileUploader
  ) {
    this.router = Router();
    this.initializeRoutes();
    this.fileUploader = new FileUploader();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/upload",
      this.authMiddleware.hostAuth,
      this.fileUploader.uploadMulter.single("image"),
      (req, res, next) => this.fileUploadController.uploadFile(req, res, next)
    );
    this.router.post(
      "/delete",
      this.authMiddleware.hostAuth,
      (req, res, next) => this.fileUploadController.deleteFile(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
