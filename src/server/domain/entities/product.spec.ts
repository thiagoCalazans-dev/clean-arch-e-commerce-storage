import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Size } from "./size";
import { Product } from "./product";
import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";

describe("teste Product Entity rules", () => {
  it("should instance Product", () => {
    const baseProduct = {
      name: "bikini",
      code: "CMD-111",
      cost: 12.67,
      description: "lorem ipsum dolor",
      trending: true,
      categoryID: "qualquer um",
      brandId: "qualquer dois",
    };

    const product = new Product(baseProduct);

    expect(product.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    const baseProduct = {
      name: "",
      code: "CMD-111",
      cost: 12.67,
      description: "lorem ipsum dolor",
      trending: true,
      categoryID: "qualquer um",
      brandId: "qualquer dois",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if code does not exists", async () => {
    const baseProduct = {
      name: "bikini",
      code: "",
      cost: 12.67,
      description: "lorem ipsum dolor",
      trending: true,
      categoryID: "qualquer um",
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
      cost: 12.67,
      description: "",
      trending: true,
      categoryID: "qualquer um",
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
      cost: 12.67,
      description: "lorem ipsum dolor",
      trending: true,
      categoryID: "",
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
      cost: 12.67,
      description: "lorem ipsum dolor",
      trending: true,
      categoryID: "qualquer um",
      brandId: "",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(IsRequiredError);
  });

  it("should instance with a default false value on trending", async () => {
    const baseProduct = {
      name: "bikini",
      code: "XXX-1000",
      cost: 12.67,
      description: "lorem ipsum dolor",
      categoryID: "qualquer um",
      brandId: "qualquer um",
    };

    const product = new Product(baseProduct);

    expect(product.trending).toBeFalsy();
  });

  it("should throw an error if cost has more then two decimals", async () => {
    const baseProduct = {
      name: "bikini",
      code: "XXX-1000",
      cost: 12.671,
      description: "lorem ipsum dolor",
      categoryID: "qualquer um",
      brandId: "qualquer um",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(isCurrencyTypeValueError);
  });

  it("should throw an error if cost has negative type", async () => {
    const baseProduct = {
      name: "bikini",
      code: "XXX-1000",
      cost: -12.9,
      description: "lorem ipsum dolor",
      categoryID: "qualquer um",
      brandId: "qualquer um",
    };

    await expect(() => {
      const product = new Product(baseProduct);
    }).toThrow(isCurrencyTypeValueError);
  });
});
