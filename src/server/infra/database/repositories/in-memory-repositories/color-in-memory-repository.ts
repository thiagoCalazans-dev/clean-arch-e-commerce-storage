import { randomUUID } from "node:crypto";
import {
  ColorRepository,
  RepositoryColor,
  RepositoryCreateColor,
} from "../color-repository";

export class InMemoryColorRepository implements ColorRepository {
  public colors: RepositoryColor[] = [];

  async create(data: RepositoryCreateColor) {
    const id = randomUUID();
    const color = {
      ...data,
      id,
    };

    this.colors.push(color);
  }

  async findMany() {
    return this.colors;
  }

  async findByName(name: string): Promise<RepositoryColor | null> {
    const colors = this.colors.find((item) => item.name === name);
    return colors || null;
  }

  async findByValue(value: string): Promise<RepositoryColor | null> {
    const colors = this.colors.find((item) => item.value === value);
    return colors || null;
  }

  async findById(id: string): Promise<RepositoryColor | null> {
    const colors = this.colors.find((item) => item.id === id);
    return colors || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.colors.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.colors.splice(index, 1);
    }
    return;
  }

  async update(data: RepositoryColor): Promise<void> {
    console.log(data);
    const index = this.colors.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      this.colors[index] = data;
      return;
    }
    throw new Error();
  }
}
