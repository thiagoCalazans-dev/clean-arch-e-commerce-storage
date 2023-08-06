import { Size } from "@/server/enterprise/entities/size";
import { SizeRepository } from "@/server/infra/database/repositories/size-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CreateSizeInputDTO } from "../../dto/sizeDTO";
import { ValueAlreadyExistError } from "../../error/ValueAlereadyExistError";

export class CreateSizeUseCase {
  constructor(private sizeRepository: SizeRepository) {}

  async execute({ data }: CreateSizeInputDTO) {
    const size = new Size(data);

    const { name, value } = size.data;

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
