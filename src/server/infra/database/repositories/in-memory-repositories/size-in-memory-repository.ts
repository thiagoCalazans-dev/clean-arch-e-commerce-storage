import { randomUUID } from "node:crypto";
import {
  SizeRepository,
  RepositorySize,
  RepositoryCreateSize,
} from "../size-repository";

export class InMemorySizeRepository implements SizeRepository {
  public sizes: RepositorySize[] = [];

  async create(data: RepositoryCreateSize) {
    const id = randomUUID();
    const size = {
      ...data,
      id,
    };

    this.sizes.push(size);
  }

  async findMany() {
    return this.sizes;
  }

  async findByName(name: string): Promise<RepositorySize | null> {
    const sizes = this.sizes.find((item) => item.name === name);
    return sizes || null;
  }

  async findByValue(value: string): Promise<RepositorySize | null> {
    const sizes = this.sizes.find((item) => item.value === value);
    return sizes || null;
  }

  async findById(id: string): Promise<RepositorySize | null> {
    const sizes = this.sizes.find((item) => item.id === id);
    return sizes || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.sizes.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.sizes.splice(index, 1);
    }
    return;
  }

  async update(data: RepositorySize): Promise<void> {
    console.log(data);
    const index = this.sizes.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      this.sizes[index] = data;
      return;
    }
    throw new Error();
  }
}
