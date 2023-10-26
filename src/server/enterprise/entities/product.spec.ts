import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Product } from "./product";

describe("teste Product Entity rules", () => {
  it("should instance Product", () => {
    const baseProduct = {
      name: "bikini",
      description: "lorem ipsum dolor",
      categoryId: "qualquer um",
      brandId: "qualquer dois",
    };

    const product = new Product(baseProduct);

    expect(product.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    const baseProduct = {
      name: "",
      description: "lorem ipsum dolor",
      categoryId: "qualquer um",
      brandId: "qualquer dois",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if code does not exists", async () => {
    const baseProduct = {
      name: "bikini",
      code: "XXX-1000",
      description: "",
      categoryId: "qualquer um",
      brandId: "qualquer dois",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if categoryId does not exists", async () => {
    const baseProduct = {
      name: "bikini",
      code: "XXX-1000",
      description: "lorem ipsum dolor",
      categoryId: "",
      brandId: "qualquer dois",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if brandId does not exists", async () => {
    const baseProduct = {
      name: "bikini",
      code: "XXX-1000",
      description: "lorem ipsum dolor",
      categoryId: "qualquer um",
      brandId: "",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(IsRequiredError);
  });

});
