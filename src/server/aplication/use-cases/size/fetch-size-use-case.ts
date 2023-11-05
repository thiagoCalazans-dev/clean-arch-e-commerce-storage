import { SizeRepository } from "../../database/repositories/size-repository";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";

export class FetchSizeUseCase {
  constructor(private sizeRepository: SizeRepository) {}

  async execute(id: string) {
    const size = await this.sizeRepository.findById(id);

    if (!size) throw new SizeNotFoundError();

    const output = {
      data: size,
    };

    return output;
  }
}
