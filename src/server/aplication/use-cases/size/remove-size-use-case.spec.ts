import { describe, it, expect, beforeEach } from "vitest";
import { InMemorySizeRepository } from "../../../infra/database/repositories/in-memory-repositories/size-in-memory-repository";
import { RemoveSizeUseCase } from "./remove-size-use-case";
import { GetSizesUseCase } from "./get-sizes-use-case";

let repository: InMemorySizeRepository;
let getCategories: GetSizesUseCase;
let sut: RemoveSizeUseCase;

describe("test RemoveSize use case", () => {
  beforeEach(async () => {
    repository = new InMemorySizeRepository();
    getCategories = new GetSizesUseCase(repository);
    sut = new RemoveSizeUseCase(repository);
    await repository.create({ name: "joao ninguem", value: "#FFFFFF" });
  });

  it("should remove a Size", async () => {
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    const deleted = await sut.execute(id);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if size dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
