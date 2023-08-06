import { randomUUID } from "node:crypto";
import {
  CategoryRepository,
  RepositoryCategory,
  RepositoryCreateCategory,
} from "../category-repository";

export class InMemoryCategoryRepository implements CategoryRepository {
  public categories: RepositoryCategory[] = [];

  async create(data: RepositoryCreateCategory) {
    const id = randomUUID();
    const category = {
      ...data,
      id,
    };

    this.categories.push(category);
  }

  async findMany() {
    return this.categories;
  }

  async findByName(name: string): Promise<RepositoryCategory | null> {
    const categories = this.categories.find((item) => item.name === name);
    return categories || null;
  }

  async findById(id: string): Promise<RepositoryCategory | null> {
    const categories = this.categories.find((item) => item.id === id);
    return categories || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
    return;
  }

  async update(data: RepositoryCategory): Promise<void> {
    const index = this.categories.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      this.categories[index] = data;
      return;
    }
    throw new Error();
  }
}
