import { ColorRepository } from "@/server/aplication/database/repositories/color-repository";
import { ColorNotFoundError } from "../../error/ColorNotFoundError";

export class FetchColorUseCase {
  constructor(private colorRepository: ColorRepository) {}

  async execute(id: string) {
    const color = await this.colorRepository.findById(id);

    if (!color) throw new ColorNotFoundError();

    const output = {
      data: color,
    };

    return output;
  }
}
