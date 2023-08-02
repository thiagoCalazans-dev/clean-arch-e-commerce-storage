import { CategoryRepository } from "@/server/infra/database/repositories/category-repository";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

export class RemoveCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const categoryExists = await this.categoryRepository.findById(id);

    if (!categoryExists) {
      throw new CategoryNotFoundError();
    }

    await this.categoryRepository.remove(id);
  }
}
