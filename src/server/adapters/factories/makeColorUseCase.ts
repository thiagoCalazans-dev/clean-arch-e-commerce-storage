import { CreateColorUseCase } from "@/server/aplication/use-cases/color/create-color-use-case";
import { PrismaColorRepository } from "../../aplication/database/repositories/prisma/color-prisma-repository";
import { RemoveColorUseCase } from "@/server/aplication/use-cases/color/remove-color-use-case";
import { FetchColorUseCase } from "@/server/aplication/use-cases/color/fetch-color-use-case";
import { UpdateColorUseCase } from "@/server/aplication/use-cases/color/update-color-use-case";
import { GetColorsUseCase } from "@/server/aplication/use-cases/color/get-colors-use-case";

export function makeCreateColorUseCase() {
  const colorRepository = new PrismaColorRepository();
  const usecase = new CreateColorUseCase(colorRepository);

  return usecase;
}

export function makeRemoveColorUseCase() {
  const colorRepository = new PrismaColorRepository();
  const usecase = new RemoveColorUseCase(colorRepository);

  return usecase;
}

export function makeGetColorsUseCase() {
  const colorRepository = new PrismaColorRepository();
  const usecase = new GetColorsUseCase(colorRepository);

  return usecase;
}

export function makeFetchColorUseCase() {
  const colorRepository = new PrismaColorRepository();
  const usecase = new FetchColorUseCase(colorRepository);

  return usecase;
}

export function makeUpdateColorUseCase() {
  const colorRepository = new PrismaColorRepository();
  const usecase = new UpdateColorUseCase(colorRepository);

  return usecase;
}
