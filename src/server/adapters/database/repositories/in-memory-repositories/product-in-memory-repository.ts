import { randomUUID } from "node:crypto";
import {
  ProductRepository,
  RepositoryProduct,
  RepositoryCreateProduct,
} from "../product-repository";

export class InMemoryProductRepository implements ProductRepository {
  public products: RepositoryProduct[] = [];

  async create(data: RepositoryCreateProduct) {
    const id = randomUUID();
    const product = {
      ...data,
      id,
    };

    this.products.push(product);
  }

  async findMany() {
    return this.products;
  }

  async findByName(name: string): Promise<RepositoryProduct | null> {
    const products = this.products.find((item) => item.name === name);
    return products || null;
  }

  async findByCode(code: string): Promise<RepositoryProduct | null> {
    const products = this.products.find((item) => item.code === code);
    return products || null;
  }

  async findById(id: string): Promise<RepositoryProduct | null> {
    const products = this.products.find((item) => item.id === id);
    return products || null;
  }

  async findProductWithItems(id: string): Promise<RepositoryProduct | null> {
    const products = this.products.find((item) => item.id === id);
    return products || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.products.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    return;
  }

  async update(data: RepositoryProduct): Promise<void> {
    const index = this.products.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      this.products[index] = data;
      return;
    }
    throw new Error();
  }
}
