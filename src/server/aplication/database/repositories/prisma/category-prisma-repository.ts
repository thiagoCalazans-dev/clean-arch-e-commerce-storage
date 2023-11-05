import { prisma } from "../../prismadb";
import {
  CategoryRepository,
  RepositoryCategory,
  RepositoryCreateCategory,
} from "../category-repository";

export class PrismaCategoryRepository implements CategoryRepository {
  async update(data: RepositoryCategory) {
    await prisma.category.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });
  }
  async remove(id: string) {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });
    return category;
  }
  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async create(data: RepositoryCreateCategory) {
    await prisma.category.create({
      data: {
        name: data.name,
      },
    });
  }
  async findMany() {
    const categories = prisma.category.findMany();
    return categories;
  }
}
