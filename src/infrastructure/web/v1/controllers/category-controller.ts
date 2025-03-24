import { NextFunction, Request, Response } from "express";
import { GetCategoryUseCase } from "../../../../application/use-cases/category/get-category";

export class CategoryController {
  constructor(private getCategoryUseCase: GetCategoryUseCase) {}
  async getCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.getCategoryUseCase.execute();
      if (result) {
        res.status(200).json({
            success : true,
            data : result
        })
      } else {
        res.status(404).json({
          success: false,
          message: "Categories not found.",
        });
      }
    } catch (error) {
      res.status(403);
      next(error);
    }
  }
}
