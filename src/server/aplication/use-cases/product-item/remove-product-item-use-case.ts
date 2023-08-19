import { ProductNotFoundError } from "../../error/ProductNotFoundError";
import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";

export class RemoveProductItemUseCase {
  constructor(private productItemRepository: ProductItemRepository) {}

  async execute(id: string) {
    const productItem = await this.productItemRepository.findById(id);

    if (!productItem) throw new ProductNotFoundError();

    await this.productItemRepository.remove(id);
  }
}
