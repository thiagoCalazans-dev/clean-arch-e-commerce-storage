import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create-category-use-case";
import { InMemoryCategoryRepository } from "../../database/repositories/in-memory-repositories/category-in-memory-repository";

let repository: InMemoryCategoryRepository;
let sut: CreateCategoryUseCase;

describe("test CreateCategory use case", () => {
  beforeEach(() => {
    repository = new InMemoryCategoryRepository();
    sut = new CreateCategoryUseCase(repository);
  });

  it("should create a Category", async () => {
    await sut.execute({
      data: { name: "john doe" },
    });

    const createdCategory = await repository.findByName("john doe");

    expect(createdCategory!.id).toBeDefined();
    expect(createdCategory!.name).toBe("john doe");
  });

  it("should not create a Category with an existent name", async () => {
    await sut.execute({
      data: { name: "john doe" },
    });

    await expect(() =>
      sut.execute({
        data: { name: "john doe" },
      })
    ).rejects.toThrowError();
  });
});
