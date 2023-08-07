import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "./create-product-use-case";
import { InMemoryProductRepository } from "../../../adapters/database/repositories/in-memory-repositories/product-in-memory-repository";
import { ValueAlreadyExistError } from "../../error/ValueAlreadyExistError";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { InMemoryCategoryRepository } from "@/server/adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { InMemoryBrandRepository } from "@/server/adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

let productRepository: InMemoryProductRepository;
let brandRepository: InMemoryBrandRepository;
let categoryRepository: InMemoryCategoryRepository;
let sut: CreateProductUseCase;
let brandId: string;
let categoryId: string;

describe("test CreateProduct use case", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    brandRepository = new InMemoryBrandRepository();
    categoryRepository = new InMemoryCategoryRepository();

    sut = new CreateProductUseCase(
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
  });

  it("should create a Product", async () => {
    await sut.execute({
      data: {
        name: "product",
        brandId: brandId,
        categoryId: categoryId,
        code: "XXX-9999",
        cost: 12.0,
        description: "description",
        trending: true,
      },
    });

    const createdProduct = await productRepository.findByName("product");

    expect(createdProduct!.id).toBeDefined();
    expect(createdProduct!.name).toBe("product");
  });

  it("should not create a Product with an existent name", async () => {
    await sut.execute({
      data: {
        name: "product",
        brandId: brandId,
        categoryId: categoryId,
        code: "XXX-9999",
        cost: 12.0,
        description: "description",
        trending: true,
      },
    });

    await expect(() =>
      sut.execute({
        data: {
          name: "product",
          brandId: brandId,
          categoryId: categoryId,
          code: "XXX-9988",
          cost: 12.0,
          description: "description",
          trending: true,
        },
      })
    ).rejects.toBeInstanceOf(NameAlreadyExistError);
  });

  it("should not create a Product with an existent code", async () => {
    await sut.execute({
      data: {
        name: "product",
        brandId: brandId,
        categoryId: categoryId,
        code: "XXX-9999",
        cost: 12.0,
        description: "description",
        trending: true,
      },
    });

    await expect(() =>
      sut.execute({
        data: {
          name: "product2",
          brandId: brandId,
          categoryId: categoryId,
          code: "XXX-9999",
          cost: 12.0,
          description: "description",
          trending: true,
        },
      })
    ).rejects.toBeInstanceOf(CodeAlreadyExistError);
  });
  it("should not create a Product with an inexistent brand", async () => {
    await expect(() =>
      sut.execute({
        data: {
          name: "product2",
          brandId: "inexistent",
          categoryId: categoryId,
          code: "XXX-9999",
          cost: 12.0,
          description: "description",
          trending: true,
        },
      })
    ).rejects.toBeInstanceOf(BrandNotFoundError);
  });
  it("should not create a Product with an inexistent category", async () => {
    await expect(() =>
      sut.execute({
        data: {
          name: "product2",
          brandId: brandId,
          categoryId: "inexistent",
          code: "XXX-9999",
          cost: 12.0,
          description: "description",
          trending: true,
        },
      })
    ).rejects.toBeInstanceOf(CategoryNotFoundError);
  });
});