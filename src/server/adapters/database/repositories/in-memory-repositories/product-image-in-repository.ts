import { randomUUID } from "node:crypto";
import {
  ProductImageRepository,
  RepositoryCreateProductImage,
  RepositoryProductImage,
} from "../produt-image-repository";

export class InMemoryProductImageRepository implements ProductImageRepository {
  public product_images: RepositoryProductImage[] = [];

  async create(data: RepositoryCreateProductImage) {
    const productItemId = data.product_item_id;
    const imageUrl = data.image_url;

    const id = randomUUID();
    const image = {
      id,
      productItemId,
      imageUrl,
    };

    this.product_images.push(image);
  }

  async findProductImage(productItemId: string, imageUrl: string) {
    const item = this.product_images.find(
      (item) =>
        item.productItemId === productItemId && item.imageUrl === imageUrl
    );
    return item || null;
  }

  async findById(id: string): Promise<RepositoryProductImage | null> {
    const products = this.product_images.find((item) => item.id === id);
    return products || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.product_images.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.product_images.splice(index, 1);
    }
    return;
  }
}
