import { Product } from "@/server/enterprise/entities/product";
import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { CreateProductInputDTO } from "../../dto/ProductDTO";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ data }: CreateProductInputDTO) {
    const { name, brandId, categoryId, code, cost, description, trending } =
      new Product(data);

    const nameExists = await this.productRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    const codeExists = await this.productRepository.findByCode(name);

    if (codeExists) throw new CodeAlreadyExistError();

    await this.productRepository.create({
      name,
      brandId,
      categoryId,
      code,
      cost,
      description,
      trending,
    });
  }
}
