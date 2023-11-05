import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductRepository } from "../../database/repositories/in-memory-repositories/product-in-memory-repository";
import { ValueAlreadyExistError } from "../../error/ValueAlreadyExistError";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { InMemoryCategoryRepository } from "@/server/aplication/database/repositories/in-memory-repositories/category-in-memory-repository";
import { InMemoryBrandRepository } from "@/server/aplication/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";
import { UpdateProductUseCase } from "./update-product-use-case";

let productRepository: InMemoryProductRepository;
let brandRepository: InMemoryBrandRepository;
let categoryRepository: InMemoryCategoryRepository;
let sut: UpdateProductUseCase;
let brandId: string;
let categoryId: string;
let productId: string;

describe("test UpdateProduct use case", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    brandRepository = new InMemoryBrandRepository();
    categoryRepository = new InMemoryCategoryRepository();

    sut = new UpdateProductUseCase(
      productRepository,
      brandRepository,
      categoryRepository
    );
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

    const product = await productRepository.findByName("product");
    productId = product!.id;
  });

  it("should update a Product", async () => {
    await sut.execute(
      {
        data: {
          name: "product updated",
          brandId: brandId,
          categoryId: categoryId,

          description: "description",
        },
      },
      productId
    );

    const createdProduct = await productRepository.findByName(
      "product updated"
    );

    expect(createdProduct!.id).toBeDefined();
    expect(createdProduct!.name).toBe("product updated");
  });

  it("should not create a Product with an existent name", async () => {
    await productRepository.create({
      name: "product2",
      brandId: brandId,
      categoryId: categoryId,
      description: "description",
    });

    await expect(() =>
      sut.execute(
        {
          data: {
            name: "product2",
            brandId: brandId,
            categoryId: categoryId,
            description: "description",
          },
        },
        productId
      )
    ).rejects.toBeInstanceOf(NameAlreadyExistError);
  });

  it("should not update a Product with an inexistent brand", async () => {
    await expect(() =>
      sut.execute(
        {
          data: {
            name: "product",
            brandId: "inexistentBrandID",
            categoryId: categoryId,
            description: "description",
          },
        },
        productId
      )
    ).rejects.toBeInstanceOf(BrandNotFoundError);
  });
  it("should not create a Product with an inexistent category", async () => {
    await expect(() =>
      sut.execute(
        {
          data: {
            name: "product",
            brandId: brandId,
            categoryId: "inexistentCateogryID",
            description: "description",
          },
        },
        productId
      )
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });
});
