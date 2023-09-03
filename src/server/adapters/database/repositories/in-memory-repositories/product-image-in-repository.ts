import { randomUUID } from "node:crypto";
import {
  ProductImageRepository,
  RepositoryCreateProductImage,
  RepositoryProductImage,
} from "../produt-image-repository";

export class InMemoryProductImageRepository implements ProductImageRepository {
  public images: RepositoryProductImage[] = [];

  async create(data: RepositoryCreateProductImage) {
    const id = randomUUID();
    const image = {
      ...data,
      id,
    };

    this.images.push(image);
  }

  async remove(id: string): Promise<void> {
    const index = this.images.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
    return;
  }
}
