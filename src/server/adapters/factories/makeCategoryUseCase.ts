import { RemoveCategoryUseCase } from "@/server/aplication/use-cases/category/remove-category-use-case";
import { PrismaCategoryRepository } from "../database/repositories/prisma/category-prisma-repository";
import { CreateCategoryUseCase } from "@/server/aplication/use-cases/category/create-category-use-case";
import { GetCategoriesUseCase } from "@/server/aplication/use-cases/category/get-categories-use-case";
import { FetchCategoryUseCase } from "@/server/aplication/use-cases/category/fetch-category-use-case";
import { UpdateCategoryUseCase } from "@/server/aplication/use-cases/category/update-category-use-case";

export function makeCreateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new CreateCategoryUseCase(categoryRepository);

  return usecase;
}

export function makeRemoveCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new RemoveCategoryUseCase(categoryRepository);

  return usecase;
}

export function makeGetCategoriesUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new GetCategoriesUseCase(categoryRepository);

  return usecase;
}

export function makeFetchCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new FetchCategoryUseCase(categoryRepository);

  return usecase;
}

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new UpdateCategoryUseCase(categoryRepository);

  return usecase;
}
