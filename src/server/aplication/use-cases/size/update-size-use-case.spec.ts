import { describe, it, expect, beforeEach } from "vitest";

import { InMemorySizeRepository } from "../../../adapters/database/repositories/in-memory-repositories/size-in-memory-repository";
import { GetSizesUseCase } from "./get-sizes-use-case";
import { UpdateSizeUseCase } from "./update-size-use-case";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { ValueAlreadyExistError } from "../../error/ValueAlereadyExistError";

let repository: InMemorySizeRepository;
let sut: UpdateSizeUseCase;
let getSizes: GetSizesUseCase;

describe("test UpdateSize use case", () => {
  beforeEach(async () => {
    repository = new InMemorySizeRepository();
    getSizes = new GetSizesUseCase(repository);
    sut = new UpdateSizeUseCase(repository);
    await repository.create({ name: "joao ninguem", value: "#FFFFFF" });
  });

  it("should update a Size", async () => {
    const categories = await getSizes.execute();
    const { id } = categories.data[0];

    await sut.execute(
      {
        data: { name: "maria joana", value: "#000000" },
      },
      id
    );

    expect(categories.data[0].name).toBe("maria joana");
  });

  it("should not update a Size with an existent name", async () => {
    await repository.create({ name: "maria joana", value: "#000000" });
    const createdSize = await repository.findByName("joao ninguem");

    await expect(() =>
      sut.execute(
        {
          data: { name: "maria joana", value: "#000000" },
        },
        createdSize!.id
      )
    ).rejects.toBeInstanceOf(NameAlreadyExistError);
  });

  it("should not update a Size with an existent value", async () => {
    await repository.create({ name: "maria joana", value: "#000000" });
    const createdSize = await repository.findByName("joao ninguem");

    await expect(() =>
      sut.execute(
        {
          data: { name: "joao ninguem", value: "#000000" },
        },
        createdSize!.id
      )
    ).rejects.toBeInstanceOf(ValueAlreadyExistError);
  });
});
