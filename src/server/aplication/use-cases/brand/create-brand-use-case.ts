import { Brand } from "@/server/enterprise/entities/brand";
import { BrandRepository } from "@/server/adapters/database/repositories/brand-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CreateBrandInputDTO } from "../../dto/brandDTO";

export class CreateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute({ data }: CreateBrandInputDTO) {
    const brand = new Brand(data);

    const { name } = brand.data;

    const nameExists = await this.brandRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    await this.brandRepository.create({
      name,
    });
  }
}
