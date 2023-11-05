import { ImageRepository } from "@/server/aplication/database/repositories/image-repository";
import { ImageNotFoundError } from "../../error/ImageNotFoundError";
import { ImageStorage } from "@/server/adapters/storage/image-storage-supabase";

export class RemoveImageUseCase {
  constructor(
    private imageRepository: ImageRepository,
    private imageStorage: ImageStorage
  ) {}

  async execute(id: string) {
    const image = await this.imageRepository.findById(id);

    if (!image) {
      throw new ImageNotFoundError();
    }

    const { data, error } = await this.imageStorage.Remove(image.name);

    if (error) {
      throw new Error(error.message);
    }

    await this.imageRepository.remove(id);
  }
}
