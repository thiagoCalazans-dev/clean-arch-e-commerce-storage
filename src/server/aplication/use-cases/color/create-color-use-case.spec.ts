import { describe, it, expect, beforeEach } from "vitest";
import { CreateColorUseCase } from "./create-color-use-case";
import { InMemoryColorRepository } from "../../database/repositories/in-memory-repositories/color-in-memory-repository";
import { ValueAlreadyExistError } from "../../error/ValueAlreadyExistError";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

let repository: InMemoryColorRepository;
let sut: CreateColorUseCase;

describe("test CreateColor use case", () => {
  beforeEach(() => {
    repository = new InMemoryColorRepository();
    sut = new CreateColorUseCase(repository);
  });

  it("should create a Color", async () => {
    await sut.execute({
      data: { name: "john doe", value: "#FFFFFF" },
    });

    const createdColor = await repository.findByName("john doe");

    expect(createdColor!.id).toBeDefined();
    expect(createdColor!.name).toBe("john doe");
  });

  it("should not create a Color with an existent name", async () => {
    await sut.execute({
      data: { name: "john doe", value: "#FFFFFF" },
    });

    await expect(() =>
      sut.execute({
        data: { name: "john doe", value: "#000000" },
      })
    ).rejects.toBeInstanceOf(NameAlreadyExistError);
  });

  it("should not create a Color with an existent value", async () => {
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
