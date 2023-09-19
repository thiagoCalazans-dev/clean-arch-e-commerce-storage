import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryProductImageRepository } from "@/server/adapters/database/repositories/in-memory-repositories/product-image-in-repository";
import { RemoveProductImageUseCase } from "./remove-product-image-use-case";

let productImageRepository: InMemoryProductImageRepository;
let sut: RemoveProductImageUseCase;

describe("test RemoveProduct use case", () => {
  beforeEach(async () => {
    productImageRepository = new InMemoryProductImageRepository();
    sut = new RemoveProductImageUseCase(productImageRepository);
  });

  it("should remove a Product", async () => {
    await productImageRepository.create({
      image_url: "imageURL",
      product_item_id: "productID",
    });

    const productImage = await productImageRepository.findProductImage(
      "productID",
      "imageURL"
    );

    const deleted = await sut.execute(productImage!.id);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if product dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
