import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductRepository } from "../../database/repositories/in-memory-repositories/product-in-memory-repository";
import { InMemoryBrandRepository } from "@/server/aplication/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { InMemoryCategoryRepository } from "@/server/aplication/database/repositories/in-memory-repositories/category-in-memory-repository";
import { InMemoryProductItemRepository } from "@/server/aplication/database/repositories/in-memory-repositories/product-item-in-memory-repository";
import { InMemorySizeRepository } from "@/server/aplication/database/repositories/in-memory-repositories/size-in-memory-repository";
import { InMemoryColorRepository } from "@/server/aplication/database/repositories/in-memory-repositories/color-in-memory-repository";
import { RemoveProductItemUseCase } from "./remove-product-item-use-case";
import { ProductItem } from "@/server/enterprise/entities/product-item";

let sut: RemoveProductItemUseCase;
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
    sut = new RemoveProductItemUseCase(productItemRepository);

    await colorRepository.create({ name: "white", value: "#FFFFFF" });
    await sizeRepository.create({ name: "large", value: "l" });
    await brandRepository.create({ name: "brand" });
    await categoryRepository.create({ name: "category" });
    await productRepository.create({
      name: "product",
      brandId: brandId,
      categoryId: categoryId,
      description: "description",
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

    const item = new ProductItem({
      productId,
      colorId,
      sizeId,
      price: 12.98,
      descount: 0,
      code: "XXX-9999",
    });

    productItemRepository.createAndStock(item);
    const [fistItem] = await productItemRepository.findManyByProductId(
      productId
    );
    productItemId = fistItem.id;
  });

  it("remove a Product Item", async () => {
    const productItem = await sut.execute(productItemId);
    expect(productItem).toBeUndefined();
  });

  it("should throw an error if product dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
