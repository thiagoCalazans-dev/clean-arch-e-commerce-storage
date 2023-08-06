import { Category } from "@/server/enterprise/entities/category";
import { CategoryRepository } from "@/server/adapters/database/repositories/category-repository";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../../dto/categoryDTO";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ data }: CreateCategoryInputDTO) {
    const category = new Category(data);

    const { name } = category.data;

    const nameExists = await this.categoryRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    await this.categoryRepository.create({
      name,
    });
  }
}
