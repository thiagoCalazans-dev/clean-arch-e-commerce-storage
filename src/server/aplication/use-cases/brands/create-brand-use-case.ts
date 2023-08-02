import { Brand } from "@/server/domain/entities/brand";
import { BrandRepository } from "@/server/infra/database/repositories/brand-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CreateBrandInputDTO } from "../../dto/brandDTO";

export class CreateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute({ data }: CreateBrandInputDTO) {
    console.log(data);
    const brand = new Brand(data);
    console.log(brand);

    const { name } = brand.data;

    const nameExists = await this.brandRepository.findByName(name);

    console.log(nameExists);

    if (nameExists) throw new NameAlreadyExistError();

    await this.brandRepository.create({
      name,
    });
  }
}
