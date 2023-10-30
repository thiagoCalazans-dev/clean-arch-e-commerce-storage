import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { EntryStock } from "./entry-stock";

describe("teste Incoming Entity rules", () => {
  it("should instance Product", () => {
    const baseEntry: EntryStock = {
      date: new Date(),
      productItemId: "productItemId",
      quantity: 1,
      value: 12.65,
    };

    const entry = new EntryStock(baseEntry);

    expect(entry.productItemId).toBeDefined();
  });

  it("should throw an error if productItemId does not exists", async () => {
    const baseEntry: EntryStock = {
      date: new Date(),
      productItemId: "",
      quantity: 1,
      value: 12.65,
    };

    await expect(() => {
      const entry = new EntryStock(baseEntry);
    }).toThrow(IsRequiredError);
  });
});
