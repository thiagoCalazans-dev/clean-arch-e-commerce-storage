import { describe, it, expect, beforeEach } from "vitest";
import { CreateSizeUseCase } from "./create-size-use-case";
import { InMemorySizeRepository } from "../../database/repositories/in-memory-repositories/size-in-memory-repository";
import { GetSizesUseCase } from "./get-sizes-use-case";

let repository: InMemorySizeRepository;
let createSizeUseCase: CreateSizeUseCase;
let sut: GetSizesUseCase;

describe("test Get SizesUseCase", () => {
  beforeEach(async () => {
    repository = new InMemorySizeRepository();
    createSizeUseCase = new CreateSizeUseCase(repository);
    sut = new GetSizesUseCase(repository);

    await createSizeUseCase.execute({
      data: { name: "john doe", value: "#FFFFFF" },
    });
  });

  it("should fetch all Sizes", async () => {
    const sizes = await sut.execute();

    expect(sizes.data).toHaveLength(1);
    expect(sizes.data[0].name).toBe("john doe");
  });
});
