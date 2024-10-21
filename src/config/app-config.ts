import express, { Application } from "express";
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

  private configureMiddleware() : void {
    this.app.use(express.json());
  }

  // configure routes here
  private configureRoutes(): void {
    this.app.use('/user', this.diContainer.getUserRoutes().getRouter());
  }

  private configureErrorHandling() : void {
    this.app.use(middleware.pageNotFound);
    this.app.use(middleware.handleError);
  }

  public getApp(): Application {
    return this.app;
  }
}