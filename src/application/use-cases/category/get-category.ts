import { Category } from "../../../domain/entities/category.entitiy";
import { CategoryRepository } from "../../../domain/repositories/category-repository.interface";

export class GetCategoryUseCase {
    constructor(private categoryRepository : CategoryRepository) {}
    async execute():Promise<Category[] | null> {
        return this.categoryRepository.findAll();
    }
} 