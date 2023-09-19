import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductItemRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-item-in-memory-repository";
import { CreateProductImageUseCase } from "./create-product-image-use-case";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { InMemoryProductImageRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-image-in-repository";
import { CreateProductImageInputDTO } from "../../dto/product-image-dto";
import { ProductImageAlreadyExistError } from "../../error/ProductImageExistError";
import { InMemoryImageRepository } from "@/server/adapters/database/repositories/in-memory-repositories/image-in-memory-repository";

let productItemRepository: InMemoryProductItemRepository;
let productImageRepository: InMemoryProductImageRepository;
let imageRepository: InMemoryImageRepository;
let sut: CreateProductImageUseCase;

describe("test CreateProducItem use case suite", () => {
  beforeEach(async () => {
    productItemRepository = new InMemoryProductItemRepository();
    productImageRepository = new InMemoryProductImageRepository();
    imageRepository = new InMemoryImageRepository();
    sut = new CreateProductImageUseCase(
      productItemRepository,
      productImageRepository
    );

    imageRepository.create({
      name: "xxxx.jpg",
      url: "imageUrl",
    });
  });

  it("should create a product image", async () => {
    await productItemRepository.create({
      productId: "productId",
      code: "XXX-9999",
      colorId: "colorId",
      sizeId: "sizeId",
      price: 12.98,
      descount: 0,
    });

    const x = await productItemRepository.findByCode("XXX-9999");

    const productImage: CreateProductImageInputDTO = {
      data: {
        productItemId: x!.id,
        imageUrl: "imageUrl",
      },
    };

    await sut.execute(productImage);

    const createdProductImage = await productImageRepository.findProductImage(
      x!.id,
      "imageUrl"
    );

    expect(createdProductImage).toBeDefined();
  });

  it("should not create a product item with an inexistent productItemId", async () => {
    await expect(() =>
      sut.execute({
        data: {
          productItemId: "inexistent",
          imageUrl: "imageUrl",
        },
      })
    ).rejects.toBeInstanceOf(ProductNotFoundError);
  });

  it("should not create a product image equals", async () => {
    await productItemRepository.create({
      productId: "productId",
      code: "XXX-9999",
      colorId: "colorId",
      sizeId: "sizeId",
      price: 12.98,
      descount: 0,
    });

    const x = await productItemRepository.findByCode("XXX-9999");

    const productImage: CreateProductImageInputDTO = {
      data: {
        productItemId: x!.id,
        imageUrl: "imageUrl",
      },
    };

    await sut.execute(productImage);

    const y = await productImageRepository.findProductImage(x!.id, "imageUrl");

    console.log("y:", y);

    await expect(() => sut.execute(productImage)).rejects.toBeInstanceOf(
      ProductImageAlreadyExistError
    );
  });
});
