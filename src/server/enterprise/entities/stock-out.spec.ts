import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";

import { StockOut, StockOutProps } from "./stock-out";

describe("teste Stockout Entity rules", () => {
  it("should instance Product", () => {
    const baseEntry: StockOutProps = {
      date: new Date(),
      productItemId: "productItemId",
      quantity: 1,
      price: 12.65,
    };

    const entry = new StockOut(baseEntry);

    expect(entry.productItemId).toBeDefined();
  });

  it("should instance stock out with an discount", () => {
    const baseEntry: StockOutProps = {
      date: new Date(),
      productItemId: "productItemId",
      quantity: 1,
      price: 12.65,
      discount: 10,
    };

    const entry = new StockOut(baseEntry);

    expect(entry.productItemId).toBeDefined();
  });

  it("should throw an error if productItemId does not exists", async () => {
    const baseEntry: StockOutProps = {
      date: new Date(),
      productItemId: "",
      quantity: 1,
      price: 12.65,
    };

    await expect(() => {
      const entry = new StockOut(baseEntry);
    }).toThrow(IsRequiredError);
  });
});
