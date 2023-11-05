import { ProductImageRepository } from "@/server/aplication/database/repositories/produt-image-repository";
import { ProductImageNotFoundError } from "../../error/ProductImageNotFoundError";

export class RemoveProductImageUseCase {
  constructor(private productImageRepository: ProductImageRepository) {}

  async execute(id: string) {
    const brandExists = await this.productImageRepository.findById(id);

    if (!brandExists) throw new ProductImageNotFoundError();

    await this.productImageRepository.remove(id);
  }
}
