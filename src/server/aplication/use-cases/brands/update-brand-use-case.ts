import { Brand } from "@/server/domain/entities/brand";
import { BrandRepository } from "@/server/infra/database/repositories/brand-repository";
import { UpdateBrandInputDTO } from "../../dto/brandDTO";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";

export class UpdateBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute({ data }: UpdateBrandInputDTO) {
    const props = {
      name: data.name,
    };

    const brand = new Brand(props, data.id);
    const { id, name } = brand.data;

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
