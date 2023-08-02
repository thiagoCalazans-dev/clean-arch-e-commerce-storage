import { BrandRepository } from "@/server/infra/database/repositories/brand-repository";

export class GetBrandsUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute() {
    const brands = await this.brandRepository.findMany();

    const output = {
      data: brands,
    };

    return output;
  }
}
