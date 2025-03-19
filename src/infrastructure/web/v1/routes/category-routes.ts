import { Router } from "express";
import { CategoryController } from "../controllers/category-controller";

export class CategoryRouter {
  private router: Router;
  constructor(private categoryController: CategoryController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/category", (req, res, next) =>
      this.categoryController.getCategory(req, res, next)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
