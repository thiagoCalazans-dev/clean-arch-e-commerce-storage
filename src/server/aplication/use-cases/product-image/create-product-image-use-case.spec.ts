import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductItemRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-item-in-memory-repository";
import { CreateProductImageUseCase } from "./create-product-image-use-case";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { InMemoryProductImageRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-image-in-repository";
import { CreateProductImageInputDTO } from "../../dto/product-image-dto";
import { ProductImageAlreadyExistError } from "../../error/ProductImageExistError";

let productItemRepository: InMemoryProductItemRepository;
let productImageRepository: InMemoryProductImageRepository;
let sut: CreateProductImageUseCase;

describe("test CreateProducItem use case suite", () => {
  beforeEach(async () => {
    productItemRepository = new InMemoryProductItemRepository();
    sut = new CreateProductImageUseCase(
      productItemRepository,
      productImageRepository
    );
  });

  it("should create a product image", async () => {
    const productImage: CreateProductImageInputDTO = {
      data: {
        productItemId: "productItemId",
        imageUrl: "imageUrl",
      },
    };

    await sut.execute(productImage);

    const createdProductImage = await productImageRepository.findProductImage(
      "productItemId",
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
    const productImage: CreateProductImageInputDTO = {
      data: {
        productItemId: "productItemId",
        imageUrl: "imageUrl",
      },
    };

    await sut.execute(productImage);

    await expect(() => sut.execute(productImage)).rejects.toBeInstanceOf(
      ProductImageAlreadyExistError
    );
  });
});
