import { CreateBrandUseCase } from "@/server/aplication/use-cases/brands/create-brand-use-case";
import { PrismaBrandRepository } from "../database/repositories/prisma/brand-prisma-repository";
import { RemoveBrandUseCase } from "@/server/aplication/use-cases/brands/remove-brand-use-case";
import { FetchBrandUseCase } from "@/server/aplication/use-cases/brands/fetch-brand-use-case";
import { UpdateBrandUseCase } from "@/server/aplication/use-cases/brands/update-brand-use-case";
import { GetBrandsUseCase } from "@/server/aplication/use-cases/brands/get-brands-use-case";

export function makeCreateBrandUseCase() {
  const brandRepository = new PrismaBrandRepository();
  const usecase = new CreateBrandUseCase(brandRepository);

  return usecase;
}

export function makeRemoveBrandUseCase() {
  const brandRepository = new PrismaBrandRepository();
  const usecase = new RemoveBrandUseCase(brandRepository);

  return usecase;
}

export function makeGetBrandsUseCase() {
  const brandRepository = new PrismaBrandRepository();
  const usecase = new GetBrandsUseCase(brandRepository);

  return usecase;
}

export function makeFetchBrandUseCase() {
  const brandRepository = new PrismaBrandRepository();
  const usecase = new FetchBrandUseCase(brandRepository);

  return usecase;
}

export function makeUpdateBrandUseCase() {
  const brandRepository = new PrismaBrandRepository();
  const usecase = new UpdateBrandUseCase(brandRepository);

  return usecase;
}
