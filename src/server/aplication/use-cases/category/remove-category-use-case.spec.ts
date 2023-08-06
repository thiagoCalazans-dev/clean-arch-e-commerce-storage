import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCategoryRepository } from "../../../adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { RemoveCategoryUseCase } from "./remove-category-use-case";
import { GetCategoriesUseCase } from "./get-categories-use-case";

let repository: InMemoryCategoryRepository;
let getCategories: GetCategoriesUseCase;
let sut: RemoveCategoryUseCase;

describe("test RemoveCategory use case", () => {
  beforeEach(async () => {
    repository = new InMemoryCategoryRepository();
    getCategories = new GetCategoriesUseCase(repository);
    sut = new RemoveCategoryUseCase(repository);
    await repository.create({ name: "joao ninguem" });
  });

  it("should remove a Category", async () => {
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    const deleted = await sut.execute(id);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if category dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
