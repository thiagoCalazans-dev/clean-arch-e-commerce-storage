import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryColorRepository } from "../../../infra/database/repositories/in-memory-repositories/color-in-memory-repository";
import { GetColorsUseCase } from "./get-colors-use-case";
import { UpdateColorUseCase } from "./update-color-use-case";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { ValueAlreadyExistError } from "../../error/ValueAlereadyExistError";

let repository: InMemoryColorRepository;
let sut: UpdateColorUseCase;
let getColors: GetColorsUseCase;

describe("test UpdateColor use case", () => {
  beforeEach(async () => {
    repository = new InMemoryColorRepository();
    getColors = new GetColorsUseCase(repository);
    sut = new UpdateColorUseCase(repository);
    await repository.create({ name: "joao ninguem", value: "#FFFFFF" });
  });

  it("should update a Color", async () => {
    const categories = await getColors.execute();
    const { id } = categories.data[0];

    await sut.execute(
      {
        data: { name: "maria joana", value: "#000000" },
      },
      id
    );

    expect(categories.data[0].name).toBe("maria joana");
  });

  it("should not update a Color with an existent name", async () => {
    await repository.create({ name: "maria joana", value: "#000000" });
    const createdColor = await repository.findByName("joao ninguem");

    await expect(() =>
      sut.execute(
        {
          data: { name: "maria joana", value: "#000000" },
        },
        createdColor!.id
      )
    ).rejects.toBeInstanceOf(NameAlreadyExistError);
  });

  it("should not update a Color with an existent value", async () => {
    await repository.create({ name: "maria joana", value: "#000000" });
    const createdColor = await repository.findByName("joao ninguem");

    await expect(() =>
      sut.execute(
        {
          data: { name: "joao ninguem", value: "#000000" },
        },
        createdColor!.id
      )
    ).rejects.toBeInstanceOf(ValueAlreadyExistError);
  });
});
