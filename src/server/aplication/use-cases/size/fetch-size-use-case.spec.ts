import { describe, it, expect, beforeEach } from "vitest";
import { InMemorySizeRepository } from "../../database/repositories/in-memory-repositories/size-in-memory-repository";
import { FetchSizeUseCase } from "./fetch-size-use-case";
import { GetSizesUseCase } from "./get-sizes-use-case";

let repository: InMemorySizeRepository;
let sut: FetchSizeUseCase;
let getSizes: GetSizesUseCase;

describe("test fetch size use case", () => {
  beforeEach(() => {
    repository = new InMemorySizeRepository();
    getSizes = new GetSizesUseCase(repository);
    sut = new FetchSizeUseCase(repository);
  });

  it("should fetch  Size", async () => {
    await repository.create({ name: "john doe", value: "#ffffff" });
    const categories = await getSizes.execute();
    const { id } = categories.data[0];

    const size = await sut.execute(id);

    expect(size).toBeDefined();
    expect(size.data.name).toBe("john doe");
  });

  it("should throw an error if size dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
