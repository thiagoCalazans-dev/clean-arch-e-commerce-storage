import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryBrandRepository } from "../../database/repositories/in-memory-repositories/brand-in-memory-repository";
import { FetchBrandUseCase } from "./fetch-brand-use-case";
import { GetBrandsUseCase } from "./get-brands-use-case";

let repository: InMemoryBrandRepository;
let sut: FetchBrandUseCase;
let getBrands: GetBrandsUseCase;

describe("test fetch brand use case", () => {
  beforeEach(() => {
    repository = new InMemoryBrandRepository();
    getBrands = new GetBrandsUseCase(repository);
    sut = new FetchBrandUseCase(repository);
  });

  it("should fetch  Brand", async () => {
    await repository.create({ name: "john doe" });
    const categories = await getBrands.execute();
    const { id } = categories.data[0];

    const brand = await sut.execute(id);

    expect(brand).toBeDefined();
    expect(brand.data.name).toBe("john doe");
  });

  it("should throw an error if brand dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
