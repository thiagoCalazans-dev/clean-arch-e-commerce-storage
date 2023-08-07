import { Product } from "@/server/enterprise/entities/product";
import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { UpdateProductInputDTO } from "../../dto/ProductDTO";
import { BrandRepository } from "@/server/adapters/database/repositories/brand-repository";
import { CategoryRepository } from "@/server/adapters/database/repositories/category-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute({ data }: UpdateProductInputDTO, id: string) {
    const { name, brandId, categoryId, code, cost, description, trending } =
      new Product(data, id);

    const nameExists = await this.productRepository.findByName(name);
    if (nameExists && nameExists.id !== id) throw new NameAlreadyExistError();

    const codeExists = await this.productRepository.findByCode(code);
    if (codeExists && codeExists.id !== id) throw new CodeAlreadyExistError();

    const categoryExists = await this.categoryRepository.findById(categoryId);
    if (!categoryExists) throw new CategoryNotFoundError();

    const brandExists = await this.brandRepository.findById(brandId);
    if (!brandExists) throw new BrandNotFoundError();

    await this.productRepository.update({
      id,
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
