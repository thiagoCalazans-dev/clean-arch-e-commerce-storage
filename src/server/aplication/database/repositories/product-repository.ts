import { BrandRepository, RepositoryBrand } from "./brand-repository";
import { RepositoryCategory } from "./category-repository";
import { RepositoryProductItem } from "./product-item-repository";

export interface RepositoryCreateProduct {
  name: string;
  brandId: string;
  categoryId: string;
  description: string;
}

export interface RepositoryProduct {
  id: string;
  name: string;
  brandId: string;
  brand?: RepositoryBrand;
  categoryId: string;
  category?: RepositoryCategory;
  description: string;
  productItem?: RepositoryProductItem[];
}

export interface ProductRepository {
  create: (data: RepositoryCreateProduct) => Promise<void>;
  update: (data: RepositoryProduct) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositoryProduct[]>;
  findByName: (name: string) => Promise<RepositoryProduct | null>;
  findById: (id: string) => Promise<RepositoryProduct | null>;
  findProductWithItems: (
    productId: string
  ) => Promise<RepositoryProduct | null>;
}
