export interface RepositoryCreateProductImage {
  productItemId: string;
  url: string;
}

export interface RepositoryProductImage {
  id: string;
  productItemId: string;
  url: string;
}

export interface ProductImageRepository {
  create: (data: RepositoryCreateProductImage) => Promise<void>;
  remove: (id: string) => Promise<void>;
}
