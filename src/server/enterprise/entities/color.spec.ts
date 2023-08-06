import { describe, it, expect } from "vitest";
import { IsRequiredError } from "../errors/isRequiredError";
import { Color } from "./color";
import { isHexadecimalColorValue } from "../errors/isHexadecimalColorValue";

describe("teste Color Entity rules", () => {
  it("should instance Categoty", () => {
    const color = new Color({ name: "John Doe", value: "#FFFFFF" });

    expect(color.data.name).toBeDefined();
  });

  it("should throw an error if name does not exists", async () => {
    await expect(() => {
      const color = new Color({ name: "", value: "#FFFFFF" });
    }).toThrow(IsRequiredError);
  });

  it("should throw an error if value is not an hexadecimal type", async () => {
    await expect(() => {
      const color = new Color({ name: "John Doe", value: "Azul Escuro" });
    }).toThrow(isHexadecimalColorValue);
  });
});
