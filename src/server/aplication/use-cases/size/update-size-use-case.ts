import { Size } from "@/server/enterprise/entities/size";

import { UpdateSizeInputDTO } from "../../dto/sizeDTO";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";
import { ValueAlreadyExistError } from "../../error/ValueAlreadyExistError";
import { SizeRepository } from "@/server/aplication/database/repositories/size-repository";

export class UpdateSizeUseCase {
  constructor(private sizeRepository: SizeRepository) {}

  async execute({ data }: UpdateSizeInputDTO, id: string) {
    const props = {
      name: data.name,
      value: data.value,
    };

    const size = new Size(props, id);
    const { name, value } = size;

    const nameExists = await this.sizeRepository.findByName(name);

    if (nameExists && nameExists.id !== id) throw new NameAlreadyExistError();

    const sizeExists = await this.sizeRepository.findById(id);

    if (!sizeExists) throw new SizeNotFoundError();

    const valueExists = await this.sizeRepository.findByValue(value);

    if (valueExists && valueExists.id !== id)
      throw new ValueAlreadyExistError();

    await this.sizeRepository.update({
      id,
      name,
      value,
    });
  }
}
