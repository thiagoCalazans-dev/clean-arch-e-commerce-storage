import { describe, it, expect, beforeEach } from "vitest";
import { CreateColorUseCase } from "./create-color-use-case";
import { InMemoryColorRepository } from "../../../adapters/database/repositories/in-memory-repositories/color-in-memory-repository";
import { GetColorsUseCase } from "./get-colors-use-case";

let repository: InMemoryColorRepository;
let createColorUseCase: CreateColorUseCase;
let sut: GetColorsUseCase;

describe("test Get ColorsUseCase", () => {
  beforeEach(async () => {
    repository = new InMemoryColorRepository();
    createColorUseCase = new CreateColorUseCase(repository);
    sut = new GetColorsUseCase(repository);

    await createColorUseCase.execute({
      data: { name: "john doe", value: "#FFFFFF" },
    });
  });

  it("should fetch all Colors", async () => {
    const colors = await sut.execute();

    expect(colors.data).toHaveLength(1);
    expect(colors.data[0].name).toBe("john doe");
  });
});
