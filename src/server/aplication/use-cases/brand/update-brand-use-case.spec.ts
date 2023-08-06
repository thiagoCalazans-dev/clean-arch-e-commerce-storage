import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryBrandRepository } from "../../../infra/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { GetBrandsUseCase } from "./get-brands-use-case";
import { UpdateBrandUseCase } from "./update-brand-use-case";

let repository: InMemoryBrandRepository;
let sut: UpdateBrandUseCase;
let getBrands: GetBrandsUseCase;

describe("test UpdateBrand use case", () => {
  beforeEach(async () => {
    repository = new InMemoryBrandRepository();
    getBrands = new GetBrandsUseCase(repository);
    sut = new UpdateBrandUseCase(repository);
    await repository.create({ name: "joao ninguem" });
  });

  it("should update a Brand", async () => {
    const categories = await getBrands.execute();
    const { id } = categories.data[0];

    await sut.execute(
      {
        data: { name: "maria joana" },
      },
      id
    );

    expect(categories.data[0].name).toBe("maria joana");
  });

  it("should not update a Brand with an existent name", async () => {
    await repository.create({ name: "maria joana" });
    const createdBrand = await repository.findByName("joao ninguem");

    await expect(() =>
      sut.execute(
        {
          data: { name: "maria joana" },
        },
        createdBrand!.id
      )
    ).rejects.toThrowError();
  });
});
