import { BrandRepository } from "@/server/adapters/database/repositories/brand-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";
import { BrandAlreadyUsedError } from "../../error/BrandAlreadyUsedError";
import { Console } from "console";

export class RemoveBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(id: string) {
    const brandExists = await this.brandRepository.findById(id);
    const brandAlreadyUsed =
      await this.brandRepository.findBrandinInRelationships(id);

    console.log(brandAlreadyUsed);

    if (brandAlreadyUsed) throw new BrandAlreadyUsedError();

    if (!brandExists) throw new BrandNotFoundError();

    await this.brandRepository.remove(id);
  }
}
