import { BrandRepository, RepositoryBrand } from "./brand-repository";
import { RepositoryCategory } from "./category-repository";
import { RepositoryProductItem } from "./product-item-repository";

export interface RepositoryCreateProduct {
  name: string;
  brandId: string;
  categoryId: string;
  code: string;
  cost: number;
  description: string;
  trending: boolean;
}

export interface RepositoryProduct {
  id: string;
  name: string;
  brandId: string;
  brand?: RepositoryBrand;
  categoryId: string;
  category?: RepositoryCategory;
  code: string;
  cost: number;
  description: string;
  trending: boolean;
  productItem?: RepositoryProductItem[];
}

export interface ProductRepository {
  create: (data: RepositoryCreateProduct) => Promise<void>;
  update: (data: RepositoryProduct) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findMany: () => Promise<RepositoryProduct[]>;
  findByName: (name: string) => Promise<RepositoryProduct | null>;
  findByCode: (code: string) => Promise<RepositoryProduct | null>;
  findById: (id: string) => Promise<RepositoryProduct | null>;
  findProductWithItems: (
    productId: string
  ) => Promise<RepositoryProduct | null>;
}
