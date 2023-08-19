import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Product } from "./product";
import { ProductItem } from "./product-item";
import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";
import { isPercentageError } from "../errors/isPercentageError";

describe("teste Product Entity rules", () => {
  it("should instance Product", () => {
    const baseProductItem = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "colorId",
      price: 13.67,
      descount: 10,
    };

    const productItem = new ProductItem(baseProductItem);

    expect(productItem.price).toBe(13.67);
  });

  it("should throw an error if productId does not exists", async () => {
    const baseProductItem = {
      productId: "",
      sizeId: "sizeId",
      colorId: "colorId",
      price: 13.67,
      descount: 10,
    };

    await expect(() => {
      const product = new ProductItem(baseProductItem);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if sizeId does not exists", async () => {
    const baseProductItem = {
      productId: "productId",
      sizeId: "",
      colorId: "colorId",
      price: 13.67,
      descount: 10,
    };

    await expect(() => {
      const product = new ProductItem(baseProductItem);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if colorId does not exists", async () => {
    const baseProductItem = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "",
      price: 13.67,
      descount: 10,
    };

    await expect(() => {
      const product = new ProductItem(baseProductItem);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if Price does not exists", async () => {
    const baseProductItem = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "colorId",
      price: -1,
      descount: 10,
    };

    await expect(() => {
      const product = new ProductItem(baseProductItem);
    }).toThrow(isCurrencyTypeValueError);
  });

  it("should throw an error if Price does not exists", async () => {
    const baseProductItem = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "colorId",
      price: 10,
      descount: 1000,
    };

    await expect(() => {
      const product = new ProductItem(baseProductItem);
    }).toThrow(isPercentageError);
  });
});
