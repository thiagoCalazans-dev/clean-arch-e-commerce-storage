import { CreateProductImageUseCase } from "@/server/aplication/use-cases/product-image/create-product-image-use-case";
import { PrismaProductImageRepository } from "../../aplication/database/repositories/prisma/product-image-repository";
import { PrismaProductItemRepository } from "../../aplication/database/repositories/prisma/product-item-repository";
import { RemoveProductImageUseCase } from "@/server/aplication/use-cases/product-image/remove-product-image-use-case";

export function makeCreateProductImageUseCase() {
  const productImage = new PrismaProductImageRepository();
  const productItem = new PrismaProductItemRepository();
  const usecase = new CreateProductImageUseCase(productItem, productImage);

  return usecase;
}

export function makeRemoveProductItemUseCase() {
  const productImage = new PrismaProductImageRepository();
  const usecase = new RemoveProductImageUseCase(productImage);

  return usecase;
}
