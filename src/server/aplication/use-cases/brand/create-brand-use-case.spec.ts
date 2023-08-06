import { describe, it, expect, beforeEach } from "vitest";
import { CreateBrandUseCase } from "./create-brand-use-case";
import { InMemoryBrandRepository } from "../../../infra/database/repositories/in-memory-repositories/brand-in-memory-repository";

let repository: InMemoryBrandRepository;
let sut: CreateBrandUseCase;

describe("test CreateBrand use case", () => {
  beforeEach(() => {
    repository = new InMemoryBrandRepository();
    sut = new CreateBrandUseCase(repository);
  });

  it("should create a Brand", async () => {
    await sut.execute({
      data: { name: "john doe" },
    });

    const createdBrand = await repository.findByName("john doe");

    expect(createdBrand!.id).toBeDefined();
    expect(createdBrand!.name).toBe("john doe");
  });

  it("should not create a Brand with an existent name", async () => {
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
