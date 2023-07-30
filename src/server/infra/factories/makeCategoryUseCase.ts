import { PrismaCategoryRepository } from "../database/repositories/prisma/category-prisma-repository";
import { CreateCategoryUseCase } from "@/server/aplication/use-cases/category/create-category-use-case";

export function makeCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new CreateCategoryUseCase(categoryRepository);

  return usecase;
}
