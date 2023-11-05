import { randomUUID } from "node:crypto";
import {
  BrandRepository,
  RepositoryBrand,
  RepositoryCreateBrand,
} from "../brand-repository";

export class InMemoryBrandRepository implements BrandRepository {
  public brands: RepositoryBrand[] = [];

  async create(data: RepositoryCreateBrand) {
    const id = randomUUID();
    const brand = {
      ...data,
      id,
    };

    this.brands.push(brand);
  }

  async findMany() {
    return this.brands;
  }

  async findByName(name: string): Promise<RepositoryBrand | null> {
    const brands = this.brands.find((item) => item.name === name);
    return brands || null;
  }

  async findById(id: string): Promise<RepositoryBrand | null> {
    const brands = this.brands.find((item) => item.id === id);
    return brands || null;
  }

  async remove(id: string): Promise<void> {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.brands.splice(index, 1);
    }
    return;
  }

  async update(data: RepositoryBrand): Promise<void> {
    const index = this.brands.findIndex((item) => item.id === data.id);
    if (index !== -1) {
      this.brands[index] = data;
      return;
    }
    throw new Error();
  }

  async findBrandinInRelationships(id: string) {
    return false;
  }
}
