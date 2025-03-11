import { PrismaClient } from "@prisma/client";
import { Category } from "../../../../domain/entities/category.entitiy";
import { CategoryRepository } from "../../../../domain/repositories/category-repository.interface";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private prisma: PrismaClient) {}
  async findAll(): Promise<Category[] | null> {
    const result: Category[] = await this.prisma.category.findMany();
    return result;
  }
}
