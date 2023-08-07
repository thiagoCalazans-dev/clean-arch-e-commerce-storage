import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { GetProductsOutputDTO } from "../../dto/ProductDTO";

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute() {
    const products = await this.productRepository.findMany();

    const output = {
      data: products,
    };

    return output;
  }
}
