import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductRepository } from "../../../adapters/database/repositories/in-memory-repositories/product-in-memory-repository";
import { RemoveProductUseCase } from "./remove-product-use-case";
import { InMemoryBrandRepository } from "@/server/adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { InMemoryCategoryRepository } from "@/server/adapters/database/repositories/in-memory-repositories/category-in-memory-repository";

let productRepository: InMemoryProductRepository;
let brandRepository: InMemoryBrandRepository;
let categoryRepository: InMemoryCategoryRepository;
let brandId: string;
let categoryId: string;
let productId: string;
let sut: RemoveProductUseCase;

describe("test RemoveProduct use case", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    sut = new RemoveProductUseCase(productRepository);
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
      code: "XXX-9999",
      cost: 12.0,
      description: "description",
      trending: true,
    });

    const product = await productRepository.findByName("product");
    productId = product!.id;
  });

  it("should remove a Product", async () => {
    const deleted = await sut.execute(productId);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if product dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});