import { CategoryRepository } from "@/server/infra/repositories/category-repository";
import { CategoryInputDTO, CategoryOutputDTO } from "../../dto/categoryDTO";
import { Category } from "@/server/domain/entities/category";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ data }: CategoryInputDTO) {
    const category = new Category(data);

    const { name } = category.data;

    const { id } = await this.categoryRepository.create({
      name,
    });

    const response: CategoryOutputDTO = {
      data: {
        id,
        name,
      },
    };

    return response;
  }
}
