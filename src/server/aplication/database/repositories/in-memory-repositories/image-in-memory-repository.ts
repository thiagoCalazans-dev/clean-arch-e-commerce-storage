import { randomUUID } from "node:crypto";
import {
  ImageRepository,
  RepositoryCreateImage,
  RepositoryImage,
} from "../image-repository";

export class InMemoryImageRepository implements ImageRepository {
  public images: RepositoryImage[] = [];

  async create(data: RepositoryCreateImage) {
    console.log("inmemory-create", data);
    const id = randomUUID();
    const image = {
      ...data,
      id,
    };

    this.images.push(image);
  }

  async findMany() {
    return this.images;
  }

  async findByUrl(url: string): Promise<RepositoryImage | null> {
    const image = this.images.find((item) => item.url === url);
    return image || null;
  }

  async findById(id: string): Promise<RepositoryImage | null> {
    const image = this.images.find((item) => item.id === id);
    return image || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.images.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
    return;
  }
}
