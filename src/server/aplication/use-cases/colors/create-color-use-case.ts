import { Color } from "@/server/domain/entities/color";
import { ColorRepository } from "@/server/infra/database/repositories/color-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CreateColorInputDTO } from "../../dto/colorDTO";
import { ValueAlreadyExistError } from "../../error/ValueAlereadyExistError";

export class CreateColorUseCase {
  constructor(private colorRepository: ColorRepository) {}

  async execute({ data }: CreateColorInputDTO) {
    const color = new Color(data);

    const { name, value } = color.data;

    const nameExists = await this.colorRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    const valueExists = await this.colorRepository.findByValue(value);

    if (valueExists) throw new ValueAlreadyExistError();

    await this.colorRepository.create({
      name,
      value,
    });
  }
}
