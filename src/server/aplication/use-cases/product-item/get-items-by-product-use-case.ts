import { ProductItemRepository } from "@/server/adapters/database/repositories/product-item-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";

export class GetProductsUseCase {
  constructor(private productItemRepository: ProductItemRepository) {}

  async execute(productId: string) {
    const productItem = await this.productItemRepository.findManyByProductId(
      productId
    );

    if (!productItem) throw new ProductNotFoundError();

    const output = {
      data: productItem,
    };

    return output;
  }
}
