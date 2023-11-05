import { CategoryRepository } from "@/server/aplication/database/repositories/category-repository";

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    const categories = await this.categoryRepository.findMany();

    const output = {
      data: categories,
    };

    return output;
  }
}
