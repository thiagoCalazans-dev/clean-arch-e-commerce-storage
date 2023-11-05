import { CreateProductUseCase } from "@/server/aplication/use-cases/product/create-product-use-case";
import { PrismaProductRepository } from "../../aplication/database/repositories/prisma/product-prisma-repository";
import { PrismaBrandRepository } from "../../aplication/database/repositories/prisma/brand-prisma-repository";
import { PrismaCategoryRepository } from "../../aplication/database/repositories/prisma/category-prisma-repository";
import { RemoveProductUseCase } from "@/server/aplication/use-cases/product/remove-product-use-case";
import { GetProductsUseCase } from "@/server/aplication/use-cases/product/get-products-use-case";
import { FetchProductUseCase } from "@/server/aplication/use-cases/product/fetch-product-use-case";
import { UpdateProductUseCase } from "@/server/aplication/use-cases/product/update-product-use-case";
import { FetchProductsWithItemsUseCase } from "@/server/aplication/use-cases/product/fetch-product-with-items-use-case";

export function makeCreateProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const brandRepository = new PrismaBrandRepository();
  const categoryRepository = new PrismaCategoryRepository();

  const usecase = new CreateProductUseCase(
    productRepository,
    brandRepository,
    categoryRepository
  );

  return usecase;
}

export function makeRemoveProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const usecase = new RemoveProductUseCase(productRepository);

  return usecase;
}

export function makeGetProductsUseCase() {
  const productRepository = new PrismaProductRepository();
  const usecase = new GetProductsUseCase(productRepository);

  return usecase;
}

export function makeFetchProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const usecase = new FetchProductUseCase(productRepository);

  return usecase;
}

export function makeFetchProductWithItemsUseCase() {
  const productRepository = new PrismaProductRepository();
  const usecase = new FetchProductsWithItemsUseCase(productRepository);

  return usecase;
}

export function makeUpdateProductUseCase() {
  const productRepository = new PrismaProductRepository();
  const brandRepository = new PrismaBrandRepository();
  const categoryRepository = new PrismaCategoryRepository();
  const usecase = new UpdateProductUseCase(
    productRepository,
    brandRepository,
    categoryRepository
  );

  return usecase;
}
