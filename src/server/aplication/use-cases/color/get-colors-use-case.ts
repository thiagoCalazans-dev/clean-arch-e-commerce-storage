import { ColorRepository } from "@/server/infra/database/repositories/color-repository";

export class GetColorsUseCase {
  constructor(private colorRepository: ColorRepository) {}

  async execute() {
    const colors = await this.colorRepository.findMany();

    const output = {
      data: colors,
    };

    return output;
  }
}
