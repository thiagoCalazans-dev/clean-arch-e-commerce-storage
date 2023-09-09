import { describe, it, expect, beforeEach } from "vitest";
import { CreateImageUseCase } from "./create-image-use-case";
import { InMemoryImageRepository } from "../../../adapters/database/repositories/in-memory-repositories/image-in-memory-repository";
import { GetImagesUseCase } from "./get-images-use-case";

let repository: InMemoryImageRepository;
let createImageUseCase: CreateImageUseCase;
let sut: GetImagesUseCase;

describe("test Get ImagesUseCase", () => {
  beforeEach(async () => {
    repository = new InMemoryImageRepository();
    createImageUseCase = new CreateImageUseCase(repository);
    sut = new GetImagesUseCase(repository);

    await createImageUseCase.execute({
      data: { name: "john doe", url: "http://ramdom.com" },
    });
  });

  it("should fetch all Images", async () => {
    const images = await sut.execute();

    expect(images.data).toHaveLength(1);
    expect(images.data[0].name).toBe("john doe");
  });
});
