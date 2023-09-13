import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { ProductImage } from "./product-image";

describe("teste Product Image rules", () => {
  it("should instance ProductImage", () => {
    const baseProductImage = {
      productItemId: "productImageId",
      imageUrl: "URL:/asiudhauisdhasui",
    };

    const productImage = new ProductImage(baseProductImage);

    expect(productImage.imageUrl).toBe("URL:/asiudhauisdhasui");
  });

  it("should throw an error if productImageId does not exists", async () => {
    const baseProductImage = {
      productItemId: "",
      imageUrl: "URL:/asiudhauisdhasui",
    };

    await expect(() => {
      const image = new ProductImage(baseProductImage);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if url does not exists", async () => {
    const baseProductImage = {
      productItemId: "productImageId",
      imageUrl: "",
    };

    await expect(() => {
      const image = new ProductImage(baseProductImage);
    }).toThrow(IsRequiredError);
  });
});
