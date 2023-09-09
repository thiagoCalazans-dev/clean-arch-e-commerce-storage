import { describe, it, expect } from "vitest";
import { Image } from "./image";
import { IsRequiredError } from "../errors/isRequiredError";

describe("teste Category Entity rules", () => {
  it("should instance Categoty", () => {
    const image = new Image({ name: "John Doe", url: "randomURL" });

    expect(image.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      const image = new Image({ name: "", url: "randomURL" });
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if url does not exists", async () => {
    await expect(() => {
      const image = new Image({ name: "John Doe", url: "" });
    }).toThrow(IsRequiredError);
  });
});
