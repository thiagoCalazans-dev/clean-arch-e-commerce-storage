import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "./create-product-use-case";
import { InMemoryProductRepository } from "../../../adapters/database/repositories/in-memory-repositories/product-in-memory-repository";
import { GetProductsUseCase } from "./get-products-use-case";
import { InMemoryBrandRepository } from "@/server/adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { InMemoryCategoryRepository } from "@/server/adapters/database/repositories/in-memory-repositories/category-in-memory-repository";

let productRepository: InMemoryProductRepository;
let brandRepository: InMemoryBrandRepository;
let categoryRepository: InMemoryCategoryRepository;
let sut: GetProductsUseCase;
let brandId: string;
let categoryId: string;

describe("test Get ProductsUseCase", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    sut = new GetProductsUseCase(productRepository);
    brandRepository = new InMemoryBrandRepository();
    categoryRepository = new InMemoryCategoryRepository();

    await brandRepository.create({ name: "brand" });
    await categoryRepository.create({ name: "category" });

    const brand = await brandRepository.findByName("brand");
    const category = await categoryRepository.findByName("category");

    brandId = brand!.id;
    categoryId = category!.id;

    await productRepository.create({
      name: "product",
      brandId: brandId,
      categoryId: categoryId,
  
      description: "description",
    
    });
  });

  it("should get all Products", async () => {
    const products = await sut.execute();

    expect(products.data).toHaveLength(1);
    expect(products.data[0].name).toBe("product");
  });
});
