import { ImageRepository } from "@/server/adapters/database/repositories/image-repository";

export class GetImagesUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute() {
    const images = await this.imageRepository.findMany();

    const output = {
      data: images,
    };

    return output;
  }
}
