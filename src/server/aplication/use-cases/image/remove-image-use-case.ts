import { ImageRepository } from "@/server/adapters/database/repositories/image-repository";
import { ImageNotFoundError } from "../../error/ImageNotFoundError";

export class RemoveImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute(id: string) {
    const imageExists = await this.imageRepository.findById(id);

    if (!imageExists) {
      throw new ImageNotFoundError();
    }

    await this.imageRepository.remove(id);
  }
}
