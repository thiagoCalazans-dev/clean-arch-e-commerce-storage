import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create-category-use-case";
import { InMemoryCategoryRepository } from "../../../infra/database/repositories/in-memory-repositories/category-in-memory-repository";

let repository: InMemoryCategoryRepository;
let sut: CreateCategoryUseCase;

describe("test CreateCategory use case", () => {
  beforeEach(() => {
    repository = new InMemoryCategoryRepository();
    sut = new CreateCategoryUseCase(repository);
  });

  it("should create a Category", async () => {
    const newCategory = await sut.execute({
      data: { name: "john doe" },
    });

    console.log(newCategory);

    expect(newCategory.data.id).toBeDefined();
    expect(newCategory.data.name).toBe("john doe");
  });
});
