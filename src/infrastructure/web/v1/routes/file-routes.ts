import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { FileController } from "../controllers/file-controller";
import { FileUploader } from "../../../../config/multer";

export class FileRouter {
  private router: Router;
  constructor(
    private authMiddleware: AuthMiddleware,
    private fileController: FileController,
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
      this.fileUploader.uploadMulter.single("file"),
      (req, res, next) => this.fileController.uploadFile(req, res, next)
    );
    this.router.post(
      "/delete",
      this.authMiddleware.hostAuth,
      (req, res, next) => this.fileController.deleteFile(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
