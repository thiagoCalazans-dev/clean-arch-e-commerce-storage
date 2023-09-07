import { InMemoryBrandRepository } from "@/server/adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { InMemoryCategoryRepository } from "@/server/adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { InMemoryProductRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-in-memory-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "../product/create-product-use-case";
import { InMemorySizeRepository } from "@/server/adapters/database/repositories/in-memory-repositories/size-in-memory-repository";
import { InMemoryColorRepository } from "@/server/adapters/database/repositories/in-memory-repositories/color-in-memory-repository";
import { InMemoryProductItemRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-item-in-memory-repository";
import { CreateProductItemUseCase } from "./create-product-item-use-case";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";

let productRepository: InMemoryProductRepository;
let productItemRepository: InMemoryProductItemRepository;
let brandRepository: InMemoryBrandRepository;
let categoryRepository: InMemoryCategoryRepository;
let sizeRepository: InMemorySizeRepository;
let colorRepository: InMemoryColorRepository;
let sut: CreateProductItemUseCase;
let colorId: string;
let sizeId: string;
let brandId: string;
let categoryId: string;
let productId: string;

describe("test CreateProducItem use case suite", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    brandRepository = new InMemoryBrandRepository();
    categoryRepository = new InMemoryCategoryRepository();
    colorRepository = new InMemoryColorRepository();
    sizeRepository = new InMemorySizeRepository();
    productItemRepository = new InMemoryProductItemRepository();

    sut = new CreateProductItemUseCase(
      productItemRepository,
      productRepository,
      colorRepository,
      sizeRepository
    );

    await colorRepository.create({ name: "white", value: "#FFFFFF" });
    await sizeRepository.create({ name: "large", value: "l" });
    await brandRepository.create({ name: "brand" });
    await categoryRepository.create({ name: "category" });
    await productRepository.create({
      name: "product",
      brandId: brandId,
      categoryId: categoryId,
      cost: 12.0,
      description: "description",
      trending: true,
    });

    const brand = await brandRepository.findByName("brand");
    const category = await categoryRepository.findByName("category");
    const product = await productRepository.findByName("product");
    const color = await colorRepository.findByName("white");
    const size = await sizeRepository.findByName("large");

    brandId = brand!.id;
    categoryId = category!.id;
    productId = product!.id;
    colorId = color!.id;
    sizeId = size!.id;
  });

  it("should create a product item", async () => {
    const productItem = {
      data: {
        productId,
        code: "XXX-9999",
        colorId,
        sizeId,
        price: 12.98,
        descount: 0,
      },
    };

    await sut.execute(productItem);

    const createdProductItem = await productItemRepository.findManyByProductId(
      productId
    );

    expect(createdProductItem![0].id).toBeDefined();
    expect(createdProductItem![0].price).toBe(12.98);
  });

  it("should not create a product item with an inexistent productId", async () => {
    await expect(() =>
      sut.execute({
        data: {
          productId: "inexistent",
          code: "XXX-9999",
          colorId,
          sizeId,
          price: 12.98,
          descount: 0,
        },
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("should not create a product item with an inexistent color", async () => {
    await expect(() =>
      sut.execute({
        data: {
          productId,
          code: "XXX-9999",
          colorId: "none",
          sizeId,
          price: 12.98,
          descount: 0,
        },
      })
    ).rejects.toBeInstanceOf(ColorNotFoundError);
  });

  it("should not create a product item with an inexistent size", async () => {
    await expect(() =>
      sut.execute({
        data: {
          productId,
          code: "XXX-9999",
          colorId,
          sizeId: "none",
          price: 12.98,
          descount: 0,
        },
      })
    ).rejects.toBeInstanceOf(SizeNotFoundError);
  });
});
