import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create-category-use-case";
import { InMemoryCategoryRepository } from "../../../adapters/database/repositories/in-memory-repositories/category-in-memory-repository";
import { GetCategoriesUseCase } from "./get-categories-use-case";

let repository: InMemoryCategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;
let sut: GetCategoriesUseCase;

describe("test fetchCategoriesUseCase", () => {
  beforeEach(async () => {
    repository = new InMemoryCategoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(repository);
    sut = new GetCategoriesUseCase(repository);

    await createCategoryUseCase.execute({
      data: { name: "john doe" },
    });
  });

  it("should fetch all Categories", async () => {
    const categories = await sut.execute();

    expect(categories.data).toHaveLength(1);
    expect(categories.data[0].name).toBe("john doe");
  });
});
