import { describe, it, expect } from "vitest";
import { Brand } from "./brand";
import { IsRequiredError } from "../errors/isRequiredError";

describe("teste Brand Entity rules", () => {
  it("should instance Category", () => {
    const brand = new Brand({
      name: "John Doe",
    });

    expect(brand.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      const brand = new Brand({ name: "" });
    }).toThrow(IsRequiredError);
  });
});
