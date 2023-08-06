import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBrandRepository } from "../../../adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { RemoveBrandUseCase } from "./remove-brand-use-case";
import { GetBrandsUseCase } from "./get-brands-use-case";

let repository: InMemoryBrandRepository;
let getCategories: GetBrandsUseCase;
let sut: RemoveBrandUseCase;

describe("test RemoveBrand use case", () => {
  beforeEach(async () => {
    repository = new InMemoryBrandRepository();
    getCategories = new GetBrandsUseCase(repository);
    sut = new RemoveBrandUseCase(repository);
    await repository.create({ name: "joao ninguem" });
  });

  it("should remove a Brand", async () => {
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    const deleted = await sut.execute(id);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if brand dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
