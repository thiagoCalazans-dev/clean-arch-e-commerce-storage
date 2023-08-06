import { it, describe, expect } from "vitest";
import { Currency } from "./currency";
import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";

describe("teste currency validade rules value object", () => {
  it("should throw an error if cost has more then two decimals", async () => {
    const cost = 3.4567;

    await expect(() => {
      Currency.validate(cost);
    }).toThrow(isCurrencyTypeValueError);
  });

  it("should throw an error if cost has negative type", async () => {
    const cost = -3.47;

    await expect(() => {
      Currency.validate(cost);
    }).toThrow(isCurrencyTypeValueError);
  });
});
