import { Size } from "@/server/enterprise/entities/size";

import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CreateSizeInputDTO } from "../../dto/sizeDTO";
import { ValueAlreadyExistError } from "../../error/ValueAlreadyExistError";
import { SizeRepository } from "@/server/aplication/database/repositories/size-repository";

export class CreateSizeUseCase {
  constructor(private sizeRepository: SizeRepository) {}

  async execute({ data }: CreateSizeInputDTO) {
    const size = new Size(data);

    const { name, value } = size;

    const nameExists = await this.sizeRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    const valueExists = await this.sizeRepository.findByValue(value);

    if (valueExists) throw new ValueAlreadyExistError();

    await this.sizeRepository.create({
      name,
      value,
    });
  }
}
