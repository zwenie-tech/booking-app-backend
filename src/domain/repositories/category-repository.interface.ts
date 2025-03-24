import { Category } from "../entities/category.entitiy";

export interface CategoryRepository {
  findAll(): Promise<Category[] | null>;
}
