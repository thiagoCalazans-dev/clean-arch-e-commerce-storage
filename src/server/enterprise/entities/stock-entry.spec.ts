import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { StockEntry } from "./strock-entry";

describe("teste Incoming Entity rules", () => {
  it("should instance Product", () => {
    const baseEntry: StockEntry = {
      date: new Date(),
      productItemId: "productItemId",
      quantity: 1,
      value: 12.65,
    };

    const entry = new StockEntry(baseEntry);

    expect(entry.productItemId).toBeDefined();
  });

  it("should throw an error if productItemId does not exists", async () => {
    const baseEntry: StockEntry = {
      date: new Date(),
      productItemId: "",
      quantity: 1,
      value: 12.65,
    };

    await expect(() => {
      const entry = new StockEntry(baseEntry);
    }).toThrow(IsRequiredError);
  });
});
