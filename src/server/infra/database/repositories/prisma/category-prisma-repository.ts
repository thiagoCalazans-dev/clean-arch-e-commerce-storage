import { prisma } from "../../prismadb";
import {
  CategoryRepository,
  RepositoryCategory,
  RepositoryCreateCategory,
} from "../category-repository";

export class PrismaCategoryRepository implements CategoryRepository {
  async create(data: RepositoryCreateCategory) {
    const createdCategory = await prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return createdCategory;
  }
  async findMany() {
    const categories = prisma.category.findMany();
    return categories;
  }
}
