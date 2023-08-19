export interface RepositoryCreateProductItem {
  productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  descount: number;
}

export interface RepositoryProductItem {
  id: string;
  productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  descount: number;
}

export interface ProductItemRepository {
  create: (data: RepositoryCreateProductItem) => Promise<void>;
  update: (data: RepositoryProductItem) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findManyByProductId: (productId: string) => Promise<RepositoryProductItem[]>;
  findById: (id: string) => Promise<RepositoryProductItem | null>;
}