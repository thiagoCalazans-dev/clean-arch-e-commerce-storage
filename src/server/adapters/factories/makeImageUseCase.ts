import { PrismaImageRepository } from "../database/repositories/prisma/image-prisma-repository";
import { CreateImageUseCase } from "@/server/aplication/use-cases/image/create-image-use-case";
import { GetImagesUseCase } from "@/server/aplication/use-cases/image/get-images-use-case";
import { RemoveImageUseCase } from "@/server/aplication/use-cases/image/remove-image-use-case";

export function makeCreateImageUseCase() {
  const imageRepository = new PrismaImageRepository();
  const usecase = new CreateImageUseCase(imageRepository);

  return usecase;
}

export function makeRemoveImageUseCase() {
  const imageRepository = new PrismaImageRepository();
  const usecase = new RemoveImageUseCase(imageRepository);

  return usecase;
}

export function makeGetImagesUseCase() {
  const imageRepository = new PrismaImageRepository();
  const usecase = new GetImagesUseCase(imageRepository);

  return usecase;
}
