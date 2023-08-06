import { SizeRepository } from "@/server/infra/database/repositories/size-repository";

export class GetSizesUseCase {
  constructor(private sizeRepository: SizeRepository) {}

  async execute() {
    const sizes = await this.sizeRepository.findMany();

    const output = {
      data: sizes,
    };

    return output;
  }
}
