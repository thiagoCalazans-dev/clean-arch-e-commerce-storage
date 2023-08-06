import { ColorRepository } from "@/server/infra/database/repositories/color-repository";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";

export class RemoveColorUseCase {
  constructor(private colorRepository: ColorRepository) {}

  async execute(id: string) {
    const colorExists = await this.colorRepository.findById(id);

    if (!colorExists) {
      throw new ColorNotFoundError();
    }

    await this.colorRepository.remove(id);
  }
}
