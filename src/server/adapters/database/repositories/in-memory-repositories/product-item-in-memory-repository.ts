import { randomUUID } from "node:crypto";
import {
  ProductItemRepository,
  RepositoryCreateProductItem,
  RepositoryProductItem,
} from "../product-item-repository";

export class InMemoryProductItemRepository implements ProductItemRepository {
  public productsItems: RepositoryProductItem[] = [];

  async create(data: RepositoryCreateProductItem) {
    const id = randomUUID();
    const item = {
      ...data,
      id,
    };

    this.productsItems.push(item);
  }

  async findManyByProductId(productId: string) {
    const filteredItems = this.productsItems.filter(
      (item) => item.productId === productId
    );
    return filteredItems;
  }

  async findById(id: string) {
    const item = this.productsItems.find((item) => item.id === id);
    return item || null;
  }

  async findByCode(code: string) {
    const item = this.productsItems.find((item) => item.code === code);
    return item || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.productsItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.productsItems.splice(index, 1);
    }
    return;
  }

  async update(data: RepositoryProductItem): Promise<void> {
    const index = this.productsItems.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      this.productsItems[index] = data;
      return;
    }
    throw new Error();
  }
}
