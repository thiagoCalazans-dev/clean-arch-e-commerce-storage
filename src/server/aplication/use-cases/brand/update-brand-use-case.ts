import { Brand } from "@/server/enterprise/entities/brand";
import { BrandRepository } from "@/server/aplication/database/repositories/brand-repository";
import { UpdateBrandInputDTO } from "../../dto/brandDTO";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";

export class UpdateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute({ data }: UpdateBrandInputDTO, brandId: string) {
    const brand = new Brand(data, brandId);
    const { id, name } = brand;

    const nameExists = await this.brandRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    const brandExists = await this.brandRepository.findById(id);

    if (!brandExists) throw new BrandNotFoundError();

    await this.brandRepository.update({
      id,
      name,
    });
  }
}
