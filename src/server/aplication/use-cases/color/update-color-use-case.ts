import { Color } from "@/server/enterprise/entities/color";
import { ColorRepository } from "@/server/aplication/database/repositories/color-repository";
import { UpdateColorInputDTO } from "../../dto/colorDTO";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";
import { ValueAlreadyExistError } from "../../error/ValueAlreadyExistError";

export class UpdateColorUseCase {
  constructor(private colorRepository: ColorRepository) {}

  async execute({ data }: UpdateColorInputDTO, id: string) {
    const props = {
      name: data.name,
      value: data.value,
    };

    const color = new Color(props, id);
    const { name, value } = color;

    const nameExists = await this.colorRepository.findByName(name);

    if (nameExists && nameExists.id !== id) throw new NameAlreadyExistError();

    const colorExists = await this.colorRepository.findById(id);

    if (!colorExists) throw new ColorNotFoundError();

    const valueExists = await this.colorRepository.findByValue(value);

    if (valueExists && valueExists.id !== id)
      throw new ValueAlreadyExistError();

    await this.colorRepository.update({
      id,
      name,
      value,
    });
  }
}
