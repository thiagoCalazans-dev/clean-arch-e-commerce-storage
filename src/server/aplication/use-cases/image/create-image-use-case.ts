import { ImageRepository } from "@/server/adapters/database/repositories/image-repository";
import { Image } from "@/server/enterprise/entities/image";
import { UrlAlreadyExistError } from "../../error/UrlAlreadyExistError";
import { CreateProductImageInputDTO } from "../../dto/image-dto";

export class CreateImageUseCase {
  constructor(private imageRepository: ImageRepository) {}

  async execute({ data }: CreateProductImageInputDTO) {
    const { name, url } = new Image(data);

    const ImageUrlExists = await this.imageRepository.findByUrl(url);

    if (ImageUrlExists) throw new UrlAlreadyExistError();

    await this.imageRepository.create({
      name,
      url,
    });
  }
}
