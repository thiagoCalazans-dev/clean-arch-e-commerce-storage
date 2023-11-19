import { RepositoryCreateStock } from "./stock-repository";

export interface RepositoryStockOut {
  id: string;
  productItemId: string;
  date: Date;
  price: number;
  discount: number;
  quantity: number;
}

export interface RepositoryCreateStockOut {
  productItemId: string;
  date: Date;
  price: number;
  discount: number;
  quantity: number;
}

export interface StockOutRepository {
  createStockOutAndUpdateStock: (
    stockOut: RepositoryCreateStockOut,
    stock: RepositoryCreateStock
  ) => Promise<void>;
  findMany: () => Promise<RepositoryStockOut[]>;
  findManyByProductItemId: (
    productItemId: string
  ) => Promise<RepositoryStockOut[]>;
}
