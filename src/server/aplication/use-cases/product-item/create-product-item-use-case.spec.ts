import { InMemoryBrandRepository } from "@/server/adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { InMemoryCategoryRepository } from "@/server/adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { InMemoryProductRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-in-memory-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateProductUseCase } from "../product/create-product-use-case";
import { InMemorySizeRepository } from "@/server/adapters/database/repositories/in-memory-repositories/size-in-memory-repository";
import { InMemoryColorRepository } from "@/server/adapters/database/repositories/in-memory-repositories/color-in-memory-repository";
import { InMemoryProductItemRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-item-in-memory-repository";
import { CreateProductItemUseCase } from "./create-product-item-use-case";

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

describe("test CreateProduct use case", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    brandRepository = new InMemoryBrandRepository();
    categoryRepository = new InMemoryCategoryRepository();
    colorRepository = new InMemoryColorRepository();
    sizeRepository = new InMemorySizeRepository();

    sut = new CreateProductItemUseCase(productItemRepository);

    await colorRepository.create({ name: "white", value: "#FFFFFF" });
    await sizeRepository.create({ name: "large", value: "l" });
    await brandRepository.create({ name: "brand" });
    await categoryRepository.create({ name: "category" });
    await productRepository.create({
      name: "product",
      brandId: brandId,
      categoryId: categoryId,
      code: "XXX-9999",
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
});
