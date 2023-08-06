import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCategoryRepository } from "../../../adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { FetchCategoryUseCase } from "./fetch-category-use-case";
import { GetCategoriesUseCase } from "./get-categories-use-case";

let repository: InMemoryCategoryRepository;
let sut: FetchCategoryUseCase;
let getCategories: GetCategoriesUseCase;

describe("test fetch category use case", () => {
  beforeEach(() => {
    repository = new InMemoryCategoryRepository();
    getCategories = new GetCategoriesUseCase(repository);
    sut = new FetchCategoryUseCase(repository);
  });

  it("should fetch  Category", async () => {
    await repository.create({ name: "john doe" });
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    const category = await sut.execute(id);

    expect(category).toBeDefined();
    expect(category.data.name).toBe("john doe");
  });

  it("should throw an error if category dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
