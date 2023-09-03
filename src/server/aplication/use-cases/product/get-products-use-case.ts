import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { GetProductsOutputDTO } from "../../dto/productDTO";

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
