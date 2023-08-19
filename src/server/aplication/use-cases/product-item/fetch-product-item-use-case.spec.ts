import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductRepository } from "../../../adapters/database/repositories/in-memory-repositories/product-in-memory-repository";
import { InMemoryBrandRepository } from "@/server/adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { InMemoryCategoryRepository } from "@/server/adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { InMemoryProductItemRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-item-in-memory-repository";
import { InMemorySizeRepository } from "@/server/adapters/database/repositories/in-memory-repositories/size-in-memory-repository";
import { InMemoryColorRepository } from "@/server/adapters/database/repositories/in-memory-repositories/color-in-memory-repository";
import { CreateProductItemUseCase } from "./create-product-item-use-case";
import { FetchProductItemUseCase } from "./fetch-product-item-use-case";

let sut: FetchProductItemUseCase;
let productRepository: InMemoryProductRepository;
let productItemRepository: InMemoryProductItemRepository;
let brandRepository: InMemoryBrandRepository;
let categoryRepository: InMemoryCategoryRepository;
let sizeRepository: InMemorySizeRepository;
let colorRepository: InMemoryColorRepository;
let colorId: string;
let sizeId: string;
let brandId: string;
let categoryId: string;
let productId: string;
let productItemId: string;

describe("test CreateProducItem use case suite", () => {
  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    brandRepository = new InMemoryBrandRepository();
    categoryRepository = new InMemoryCategoryRepository();
    colorRepository = new InMemoryColorRepository();
    sizeRepository = new InMemorySizeRepository();
    productItemRepository = new InMemoryProductItemRepository();
    sut = new FetchProductItemUseCase(productItemRepository);

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

    const item = {
      productId,
      colorId,
      sizeId,
      price: 12.98,
      descount: 0,
    };

    productItemRepository.create(item);
    const [fistItem] = await productItemRepository.findManyByProductId(
      productId
    );
    productItemId = fistItem.id;
  });

  it("fetch a Product Item", async () => {
    const productItem = await sut.execute(productItemId);

    expect(productItem).toBeDefined();
    expect(productItem.data.price).toBe(12.98);
  });

  it("should throw an error if product dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
