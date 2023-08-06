import { Category } from "@/server/domain/entities/category";
import { CategoryRepository } from "@/server/infra/database/repositories/category-repository";
import { UpdateCategoryInputDTO } from "../../dto/categoryDTO";
import { NameAlreadyExistError } from "../../error/NameAlreadyExistError";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ data }: UpdateCategoryInputDTO, categoryId: string) {
    const category = new Category(data, categoryId);
    const { id, name } = category.data;

    const nameExists = await this.categoryRepository.findByName(name);

    if (nameExists) throw new NameAlreadyExistError();

    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) throw new CategoryNotFoundError();

    await this.categoryRepository.update({
      id,
      name,
    });
  }
}
