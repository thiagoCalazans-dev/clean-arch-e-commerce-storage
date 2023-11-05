import { RepositoryProductItem } from "./product-item-repository";

export interface RepositoryStock {
  id: string;
  productItemId: string;
  quantity: number;
  productItem?: RepositoryProductItem
}

export interface RepositoryCreateStock {
  productItemId: string;
  quantity: number;
}

export interface StockRepository {
  findMany: () => Promise<RepositoryStock[]>;
  findByProductItemId: (productItemId: string) => Promise<RepositoryStock | null>
}
