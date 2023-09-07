import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Size } from "./size";

describe("teste Size Entity rules", () => {
  it("should instance Categoty", () => {
    const size = new Size({ name: "Large", value: "L" });

    expect(size.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      const size = new Size({ name: "", value: "L" });
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if value does not exists", async () => {
    await expect(() => {
      const size = new Size({ name: "Large", value: "" });
    }).toThrow(IsRequiredError);
  });
});
