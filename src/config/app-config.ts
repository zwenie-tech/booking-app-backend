import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import { DiContainer } from "./di-container";
import { middleware } from "../infrastructure/web/v1/middlewares/error-handle";

export class App {
  private app: Application;
  private diContainer: DiContainer;

  constructor() {
    this.app = express();
    this.diContainer = DiContainer.getInstance();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(cors());
  }

  // configure routes here
  private configureRoutes(): void {
    this.app.use("/api/v1", this.diContainer.getAuthRoutes().getRouter());
    this.app.use("/api/v1/users", this.diContainer.getUserRoutes().getRouter());
    this.app.use("/api/v1/hosts", this.diContainer.getHostRoutes().getRouter());
    this.app.use("/api/v1/s3", this.diContainer.getFileRoutes().getRouter());
  }

  private configureErrorHandling(): void {
    this.app.use(middleware.pageNotFound);
    this.app.use(middleware.handleError);
  }

  public getApp(): Application {
    return this.app;
  }
}
