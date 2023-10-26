import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Outgoing } from "./outgoing";

describe("teste Outgoing Entity rules", () => {
  it("should instance Product", () => {
    const baseOutgoing: Outgoing = {
      date: new Date(),
      productItemId: "productItemId",
      quantity: 1,
    };

    const outgoing = new Outgoing(baseOutgoing);

    expect(baseOutgoing.productItemId).toBeDefined();
  });

  it("should throw an error if productItemId does not exists", async () => {
    const baseIncoming: Outgoing = {
      date: new Date(),
      productItemId: "",
      quantity: 1,
    };

    await expect(() => {
      const outgoing = new Outgoing(baseIncoming);
    }).toThrow(IsRequiredError);
  });
});
