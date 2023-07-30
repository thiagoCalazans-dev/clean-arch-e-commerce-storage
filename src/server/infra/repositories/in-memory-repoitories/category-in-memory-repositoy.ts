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

    return category;
  }

  async findMany() {
    return this.categories;
  }
}
