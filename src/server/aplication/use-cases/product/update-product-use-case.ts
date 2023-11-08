import { Product } from "@/server/enterprise/entities/product";
import { ProductRepository } from "@/server/aplication/database/repositories/product-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { UpdateProductInputDTO } from "../../dto/productDTO";
import { BrandRepository } from "@/server/aplication/database/repositories/brand-repository";
import { CategoryRepository } from "@/server/aplication/database/repositories/category-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute({ data }: UpdateProductInputDTO, id: string) {
    const { name, brandId, categoryId, description } = new Product(data, id);

    const nameExists = await this.productRepository.findByName(name);
    if (nameExists && nameExists.id !== id) throw new NameAlreadyExistError();

    const categoryExists = await this.categoryRepository.findById(categoryId);
    if (!categoryExists) throw new CategoryNotFoundError();

    const brandExists = await this.brandRepository.findById(brandId);
    if (!brandExists) throw new BrandNotFoundError();

    await this.productRepository.update({
      id,
      name,
      brandId,
      categoryId,
      description,
    });
  }
}
