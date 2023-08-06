import { describe, it, expect, beforeEach } from "vitest";
import { CreateSizeUseCase } from "./create-size-use-case";
import { InMemorySizeRepository } from "../../../adapters/database/repositories/in-memory-repositories/size-in-memory-repository";
import { ValueAlreadyExistError } from "../../error/ValueAlereadyExistError";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

let repository: InMemorySizeRepository;
let sut: CreateSizeUseCase;

describe("test CreateSize use case", () => {
  beforeEach(() => {
    repository = new InMemorySizeRepository();
    sut = new CreateSizeUseCase(repository);
  });

  it("should create a Size", async () => {
    await sut.execute({
      data: { name: "john doe", value: "#FFFFFF" },
    });

    const createdSize = await repository.findByName("john doe");

    expect(createdSize!.id).toBeDefined();
    expect(createdSize!.name).toBe("john doe");
  });

  it("should not create a Size with an existent name", async () => {
    await sut.execute({
      data: { name: "john doe", value: "#FFFFFF" },
    });

    await expect(() =>
      sut.execute({
        data: { name: "john doe", value: "#000000" },
      })
    ).rejects.toBeInstanceOf(NameAlreadyExistError);
  });

  it("should not create a Size with an existent value", async () => {
    await sut.execute({
      data: { name: "maria joana", value: "#FFFFFF" },
    });

    await expect(() =>
      sut.execute({
        data: { name: "joao das neves", value: "#FFFFFF" },
      })
    ).rejects.toBeInstanceOf(ValueAlreadyExistError);
  });
});
