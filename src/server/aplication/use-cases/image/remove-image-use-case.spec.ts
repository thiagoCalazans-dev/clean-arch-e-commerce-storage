import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryImageRepository } from "../../../adapters/database/repositories/in-memory-repositories/image-in-memory-repository";

import { GetImagesUseCase } from "./get-images-use-case";
import { RemoveImageUseCase } from "./remove-image-use-case";

let repository: InMemoryImageRepository;
let getCategories: GetImagesUseCase;
let sut: RemoveImageUseCase;

describe("test RemoveImage use case", () => {
  beforeEach(async () => {
    repository = new InMemoryImageRepository();
    getCategories = new GetImagesUseCase(repository);
    sut = new RemoveImageUseCase(repository);
    await repository.create({
      name: "joao ninguem",
      url: "http://hgtasdsa.com",
    });
  });

  it("should remove a Image", async () => {
    const categories = await getCategories.execute();
    const { id } = categories.data[0];

    const deleted = await sut.execute(id);

    expect(deleted).toBeUndefined();
  });

  it("should throw an error if image dont exist", async () => {
    await expect(() => sut.execute("qualquer id")).rejects.toThrowError();
  });
});
