import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Incoming } from "./incoming";

describe("teste Incoming Entity rules", () => {
  it("should instance Product", () => {
    const baseIncoming: Incoming = {
      date: new Date(),
      productItemId: "productItemId",
      quantity: 1,
      value: 12.65,
    };

    const incoming = new Incoming(baseIncoming);

    expect(incoming.productItemId).toBeDefined();
  });

  it("should throw an error if productItemId does not exists", async () => {
    const baseIncoming: Incoming = {
      date: new Date(),
      productItemId: "",
      quantity: 1,
      value: 12.65,
    };

    await expect(() => {
      const incoming = new Incoming(baseIncoming);
    }).toThrow(IsRequiredError);
  });
});
