import { InMemoryCategoryRepository } from "@/server/infra/repositories/in-memory-repoitories/category-in-memory-repositoy";
import { CreateCategoryUseCase } from "../../aplication/use-cases/category/create-category-use-case";

export function makeCategoryUseCase() {
  const categoryRepository = new InMemoryCategoryRepository();
  const usecase = new CreateCategoryUseCase(categoryRepository);

  return usecase;
}
