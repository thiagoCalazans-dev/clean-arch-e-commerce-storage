import { ProductItemRepository } from "../../database/repositories/product-item-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";

export class FetchProductItemUseCase {
  constructor(private productItemRepository: ProductItemRepository) {}

  async execute(productItemId: string) {
    const productItem = await this.productItemRepository.findById(
      productItemId
    );

    if (!productItem) throw new ProductNotFoundError();

    const output = {
      data: productItem,
    };

    return output;
  }
}
