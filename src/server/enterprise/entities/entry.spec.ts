import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Entry } from "./entry";
import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";
import { isPercentageError } from "../errors/isPercentageError";

describe("teste Product Entity rules", () => {
  it("should instance Product", () => {
    const baseEntry = {
      productId: "productId",
      code: "CMD-111",
      sizeId: "sizeId",
      colorId: "colorId",
      price: 13.67,
      descount: 10,
      quantity: 1,
    };

    const productItem = new Entry(baseEntry);

    expect(productItem.price).toBe(13.67);
  });

  it("should throw an error if productId does not exists", async () => {
    const baseEntry = {
      productId: "",
      sizeId: "sizeId",
      colorId: "colorId",
      code: "CMD-111",
      price: 13.67,
      descount: 10,
      quantity: 1,
    };

    await expect(() => {
      const product = new Entry(baseEntry);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if sizeId does not exists", async () => {
    const baseEntry = {
      productId: "productId",
      code: "CMD-111",
      sizeId: "",
      colorId: "colorId",
      price: 13.67,
      descount: 10,
      quantity: 1,
    };

    await expect(() => {
      const product = new Entry(baseEntry);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if code does not exists", async () => {
    const baseEntry = {
      productId: "productId",
      sizeId: "sizeId",
      code: "",
      colorId: "colorId",
      price: 13.67,
      descount: 10,
      quantity: 1,
    };

    await expect(() => {
      const product = new Entry(baseEntry);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if colorId does not exists", async () => {
    const baseEntry = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "",
      code: "CMD-111",
      price: 13.67,
      descount: 10,
      quantity: 1,
    };

    await expect(() => {
      const product = new Entry(baseEntry);
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if Price does not exists", async () => {
    const baseEntry = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "colorId",
      code: "CMD-111",
      price: -1,
      descount: 10,
      quantity: 1,
    };

    await expect(() => {
      const product = new Entry(baseEntry);
    }).toThrow(isCurrencyTypeValueError);
  });

  it("should throw an error if descount > 100", async () => {
    const baseEntry = {
      productId: "productId",
      sizeId: "sizeId",
      colorId: "colorId",
      code: "CMD-111",
      price: 10,
      descount: 1000,
      quantity: 1,
    };

    await expect(() => {
      const product = new Entry(baseEntry);
    }).toThrow(isPercentageError);
  });
});
