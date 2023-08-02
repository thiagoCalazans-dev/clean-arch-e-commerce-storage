import { CategoryRepository } from "@/server/infra/database/repositories/category-repository";
import { CategoryNotFoundError } from "../../error/CategoryNotFoundError";

export class FetchCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id);

    if (!category) throw new CategoryNotFoundError();

    const output = {
      data: category,
    };

    return output;
  }
}
