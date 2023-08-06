import { describe, it, expect, beforeEach } from "vitest";
import { CreateBrandUseCase } from "./create-brand-use-case";
import { InMemoryBrandRepository } from "../../../adapters/database/repositories/in-memory-repositories/brand-in-memory-repository";
import { GetBrandsUseCase } from "./get-brands-use-case";

let repository: InMemoryBrandRepository;
let createBrandUseCase: CreateBrandUseCase;
let sut: GetBrandsUseCase;

describe("test Get BrandsUseCase", () => {
  beforeEach(async () => {
    repository = new InMemoryBrandRepository();
    createBrandUseCase = new CreateBrandUseCase(repository);
    sut = new GetBrandsUseCase(repository);

    await createBrandUseCase.execute({
      data: { name: "john doe" },
    });
  });

  it("should fetch all Brands", async () => {
    const brands = await sut.execute();

    expect(brands.data).toHaveLength(1);
    expect(brands.data[0].name).toBe("john doe");
  });
});
