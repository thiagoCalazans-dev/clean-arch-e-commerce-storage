import { describe, it, expect, beforeEach } from "vitest";
import { UpdateCategoryUseCase } from "./update-category-use-case";
import { InMemoryCategoryRepository } from "../../../infra/database/repositories/in-memory-repositories/category-in-memory-repository";
import { GetCategoriesUseCase } from "./get-categories-use-case";

let repository: InMemoryCategoryRepository;
let sut: UpdateCategoryUseCase;
let getCategories: GetCategoriesUseCase;

describe("test UpdateCategory use case", () => {
  beforeEach(async () => {
    repository = new InMemoryCategoryRepository();
    getCategories = new GetCategoriesUseCase(repository);
    sut = new UpdateCategoryUseCase(repository);
    await repository.create({ name: "joao ninguem" });
  });

  it("should update a Category", async () => {
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    await sut.execute({
      data: { id: id, name: "maria joana" },
    });

    expect(categories.data[0].name).toBe("maria joana");
  });

  it("should not update a Category with an existent name", async () => {
    await repository.create({ name: "maria joana" });
    const createdCategory = await repository.findByName("joao ninguem");

    await expect(() =>
      sut.execute({
        data: { name: "maria joana", id: createdCategory!.id },
      })
    ).rejects.toThrowError();
  });
});
