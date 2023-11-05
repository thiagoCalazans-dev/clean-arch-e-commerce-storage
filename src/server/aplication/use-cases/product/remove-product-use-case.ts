import { ProductRepository } from "@/server/aplication/database/repositories/product-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";

export class RemoveProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string) {
    const productExists = await this.productRepository.findById(id);

    if (!productExists) {
      throw new ProductNotFoundError();
    }

    await this.productRepository.remove(id);
  }
}
