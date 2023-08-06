import { BrandRepository } from "@/server/infra/database/repositories/brand-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";

export class RemoveBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(id: string) {
    const brandExists = await this.brandRepository.findById(id);

    if (!brandExists) {
      throw new BrandNotFoundError();
    }

    await this.brandRepository.remove(id);
  }
}
