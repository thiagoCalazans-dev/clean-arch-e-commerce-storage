import { Category } from "@/server/domain/entities/category";
import { CategoryRepository } from "@/server/infra/database/repositories/category-repository";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "../../dto/categoryDTO";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({ data }: CreateCategoryInputDTO) {
    const category = new Category(data);

    const { name } = category.data;

    const { id } = await this.categoryRepository.create({
      name,
    });

    const response: CreateCategoryOutputDTO = {
      data: {
        id,
        name,
      },
    };

    return response;
  }
}
