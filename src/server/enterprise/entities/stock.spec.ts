import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Stock } from "./stock";

describe("teste Stock Entity rules", () => {
  it("should instance Stock", () => {
    const data: Stock = {
      productItemId: "productItemId",
      quantity: 1,
    };

    const stock = new Stock(data);

    expect(stock.productItemId).toBeDefined();
  });

  it("should throw an error if productItemId does not exists", async () => {
    const data: Stock = {
      productItemId: "",
      quantity: 1,
    };

    await expect(() => {
      const stock = new Stock(data);
    }).toThrow(IsRequiredError);
  });
});
