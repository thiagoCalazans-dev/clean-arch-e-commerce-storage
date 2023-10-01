export interface RepositoryCreateProductImage {
  product_item_id: string;
  image_url: string;
}

export interface RepositoryProductImage {
  id: string;
  productItemId: string;
  imageUrl: string;
}

export interface ProductImageRepository {
  create: (data: RepositoryCreateProductImage) => Promise<void>;
  remove: (id: string) => Promise<void>;
  findById: (id: string) => Promise<RepositoryProductImage | null>;
  findProductImage: (
    productItemId: string,
    ImageUrl: string
  ) => Promise<RepositoryProductImage | null>;
}
