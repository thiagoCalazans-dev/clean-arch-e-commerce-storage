import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryColorRepository } from "../../../adapters/database/repositories/in-memory-repositories/color-in-memory-repository";
import { RemoveColorUseCase } from "./remove-color-use-case";
import { GetColorsUseCase } from "./get-colors-use-case";

let repository: InMemoryColorRepository;
let getCategories: GetColorsUseCase;
let sut: RemoveColorUseCase;

describe("test RemoveColor use case", () => {
  beforeEach(async () => {
    repository = new InMemoryColorRepository();
    getCategories = new GetColorsUseCase(repository);
    sut = new RemoveColorUseCase(repository);
    await repository.create({ name: "joao ninguem", value: "#FFFFFF" });
  });

  it("should remove a Color", async () => {
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    const deleted = await sut.execute(id);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if color dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
