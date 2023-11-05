import { PrismaProductRepository } from "../../aplication/database/repositories/prisma/product-prisma-repository";
import { GetProductsUseCase } from "@/server/aplication/use-cases/product/get-products-use-case";

import { PrismaProductItemRepository } from "../../aplication/database/repositories/prisma/product-item-repository";
import { PrismaSizeRepository } from "../../aplication/database/repositories/prisma/size-prisma-repository";
import { PrismaColorRepository } from "../../aplication/database/repositories/prisma/color-prisma-repository";

import { FetchProductItemUseCase } from "@/server/aplication/use-cases/product-item/fetch-product-item-use-case";
import { CreateProductItemUseCase } from "@/server/aplication/use-cases/product-item/create-product-item-use-case";
import { RemoveProductItemUseCase } from "@/server/aplication/use-cases/product-item/remove-product-item-use-case";

export function makeCreateProductItemUseCase() {
  const productItemRepository = new PrismaProductItemRepository();
  const productRepository = new PrismaProductRepository();
  const colorRepository = new PrismaColorRepository();
  const sizeRepository = new PrismaSizeRepository();

  const usecase = new CreateProductItemUseCase(
    productItemRepository,
    productRepository,
    colorRepository,
    sizeRepository
  );

  return usecase;
}

export function makeRemoveProductItemUseCase() {
  const productItemRepository = new PrismaProductItemRepository();
  const usecase = new RemoveProductItemUseCase(productItemRepository);

  return usecase;
}

export function makeFetchProductItemUseCase() {
  const productItemRepository = new PrismaProductItemRepository();
  const usecase = new FetchProductItemUseCase(productItemRepository);

  return usecase;
}
