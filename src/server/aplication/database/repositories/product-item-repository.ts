import { RepositoryColor } from "./color-repository";
import { RepositoryProduct } from "./product-repository";
import { RepositoryProductImage } from "./produt-image-repository";
import { RepositorySize } from "./size-repository";

export interface RepositoryCreateProductItem {
  id: string;
  productId: string;
  code: string;
  colorId: string;
  sizeId: string;
  price: number;
  descount: number;
}

export interface RepositoryProductItem {
  id: string;
  productId: string;
  product?: RepositoryProduct;
  code: string;
  colorId: string;
  color?: RepositoryColor;
  sizeId: string;
  size?: RepositorySize;
  price: number;
  descount: number;
  productImages?: RepositoryProductImage[];
}

export interface ProductItemRepository {
  createAndStock: (data: RepositoryCreateProductItem) => Promise<void>;
  update: (data: RepositoryProductItem) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findManyByProductId: (productId: string) => Promise<RepositoryProductItem[]>;
  findByCode: (id: string) => Promise<RepositoryProductItem | null>;
  findById: (id: string) => Promise<RepositoryProductItem | null>;
}
