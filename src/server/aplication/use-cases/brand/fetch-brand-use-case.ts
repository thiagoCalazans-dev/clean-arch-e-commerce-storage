import { BrandRepository } from "@/server/aplication/database/repositories/brand-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";

export class FetchBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(id: string) {
    const brand = await this.brandRepository.findById(id);

    if (!brand) throw new BrandNotFoundError();

    const output = {
      data: brand,
    };

    return output;
  }
}
