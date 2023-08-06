import { SizeRepository } from "@/server/infra/database/repositories/size-repository";
import { SizeNotFoundError } from "../../error/SizeNotFoundError";

export class RemoveSizeUseCase {
  constructor(private sizeRepository: SizeRepository) {}

  async execute(id: string) {
    const sizeExists = await this.sizeRepository.findById(id);

    if (!sizeExists) {
      throw new SizeNotFoundError();
    }

    await this.sizeRepository.remove(id);
  }
}
