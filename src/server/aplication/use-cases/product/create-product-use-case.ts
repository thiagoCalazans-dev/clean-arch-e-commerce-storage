import { Product } from "@/server/enterprise/entities/product";
import { ProductRepository } from "@/server/adapters/database/repositories/product-repository";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

import { CodeAlreadyExistError } from "../../error/CodeAlreadyExistError";
import { CreateProductInputDTO } from "../../dto/productDTO";
import { BrandRepository } from "@/server/adapters/database/repositories/brand-repository";
import { CategoryRepository } from "@/server/adapters/database/repositories/category-repository";
import { BrandNotFoundError } from "../../error/BrandNotFoundError";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private brandRepository: BrandRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute({ data }: CreateProductInputDTO) {
    const { name, brandId, categoryId,  description  } =
      new Product(data);

    const nameExists = await this.productRepository.findByName(name);
    if (nameExists) throw new NameAlreadyExistError();

    const categoryExists = await this.categoryRepository.findById(categoryId);
    if (!categoryExists) throw new CategoryNotFoundError();

    const brandExists = await this.brandRepository.findById(brandId);
    if (!brandExists) throw new BrandNotFoundError();

    await this.productRepository.create({
      name,
      brandId,
      categoryId,
      description,   
    });
  }
}
