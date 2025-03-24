import { SubCategory } from "../entities/subCategory.entitiy";

export interface SubCategoryRepository {
  findAll(): Promise<SubCategory[] | null>;
}
