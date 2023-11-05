import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryColorRepository } from "../../database/repositories/in-memory-repositories/color-in-memory-repository";
import { FetchColorUseCase } from "./fetch-color-use-case";
import { GetColorsUseCase } from "./get-colors-use-case";

let repository: InMemoryColorRepository;
let sut: FetchColorUseCase;
let getColors: GetColorsUseCase;

describe("test fetch color use case", () => {
  beforeEach(() => {
    repository = new InMemoryColorRepository();
    getColors = new GetColorsUseCase(repository);
    sut = new FetchColorUseCase(repository);
  });

  it("should fetch  Color", async () => {
    await repository.create({ name: "john doe", value: "#ffffff" });
    const categories = await getColors.execute();
    const { id } = categories.data[0];

    const color = await sut.execute(id);

    expect(color).toBeDefined();
    expect(color.data.name).toBe("john doe");
  });

  it("should throw an error if color dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
