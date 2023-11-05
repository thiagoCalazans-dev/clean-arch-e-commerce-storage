import { CreateBrandUseCase } from "@/server/aplication/use-cases/brand/create-brand-use-case";
import { PrismaBrandRepository } from "../../aplication/database/repositories/prisma/brand-prisma-repository";
import { RemoveBrandUseCase } from "@/server/aplication/use-cases/brand/remove-brand-use-case";
import { FetchBrandUseCase } from "@/server/aplication/use-cases/brand/fetch-brand-use-case";
import { UpdateBrandUseCase } from "@/server/aplication/use-cases/brand/update-brand-use-case";
import { GetBrandsUseCase } from "@/server/aplication/use-cases/brand/get-brands-use-case";

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
