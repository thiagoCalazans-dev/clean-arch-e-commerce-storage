import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { ProductNotFoundError } from "../../error/ProductNotFoundError";

export class FetchProductsWithItemsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string) {
    const productItem = await this.productRepository.findProductWithItems(
      productId
    );

    console.log(productItem);

    if (!productItem) throw new ProductNotFoundError();

    const output = {
      data: productItem,
    };

    return output;
  }
}
