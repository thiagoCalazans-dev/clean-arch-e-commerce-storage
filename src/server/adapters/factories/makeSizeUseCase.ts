import { CreateSizeUseCase } from "@/server/aplication/use-cases/size/create-size-use-case";
import { PrismaSizeRepository } from "../../aplication/database/repositories/prisma/size-prisma-repository";
import { RemoveSizeUseCase } from "@/server/aplication/use-cases/size/remove-size-use-case";
import { FetchSizeUseCase } from "@/server/aplication/use-cases/size/fetch-size-use-case";
import { UpdateSizeUseCase } from "@/server/aplication/use-cases/size/update-size-use-case";
import { GetSizesUseCase } from "@/server/aplication/use-cases/size/get-sizes-use-case";

export function makeCreateSizeUseCase() {
  const sizeRepository = new PrismaSizeRepository();
  const usecase = new CreateSizeUseCase(sizeRepository);

  return usecase;
}

export function makeRemoveSizeUseCase() {
  const sizeRepository = new PrismaSizeRepository();
  const usecase = new RemoveSizeUseCase(sizeRepository);

  return usecase;
}

export function makeGetSizesUseCase() {
  const sizeRepository = new PrismaSizeRepository();
  const usecase = new GetSizesUseCase(sizeRepository);

  return usecase;
}

export function makeFetchSizeUseCase() {
  const sizeRepository = new PrismaSizeRepository();
  const usecase = new FetchSizeUseCase(sizeRepository);

  return usecase;
}

export function makeUpdateSizeUseCase() {
  const sizeRepository = new PrismaSizeRepository();
  const usecase = new UpdateSizeUseCase(sizeRepository);

  return usecase;
}
