import { describe, it, expect, beforeEach } from "vitest";
import { CreateImageUseCase } from "./create-image-use-case";
import { InMemoryImageRepository } from "../../database/repositories/in-memory-repositories/image-in-memory-repository";
import { UrlAlreadyExistError } from "../../error/UrlAlreadyExistError";

let repository: InMemoryImageRepository;
let sut: CreateImageUseCase;

describe("test CreateImage use case", () => {
  beforeEach(() => {
    repository = new InMemoryImageRepository();
    sut = new CreateImageUseCase(repository);
  });

  it("should create a Image", async () => {
    await sut.execute({
      data: { name: "john doe", url: "http://ramdom-url" },
    });

    const createdImage = await repository.findByUrl("http://ramdom-url");

    expect(createdImage!.id).toBeDefined();
    expect(createdImage!.name).toBe("john doe");
  });

  it("should not create a Image with an existent url", async () => {
    await sut.execute({
      data: { name: "john doe", url: "http://ramdom-url" },
    });

    await expect(() =>
      sut.execute({
        data: { name: "john doe", url: "http://ramdom-url" },
      })
    ).rejects.toBeInstanceOf(UrlAlreadyExistError);
  });
});
