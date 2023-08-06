import { describe, it, expect } from "vitest";
import { Category } from "./category";
import { IsRequiredError } from "../errors/isRequiredError";

describe("teste Category Entity rules", () => {
  it("should instance Categoty", () => {
    const category = new Category({ name: "John Doe" });

    expect(category.data.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      const category = new Category({ name: "" });
    }).toThrow(IsRequiredError);
  });
});
