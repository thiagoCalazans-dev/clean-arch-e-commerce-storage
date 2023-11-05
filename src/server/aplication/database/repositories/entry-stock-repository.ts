import { RepositoryCreateStock } from "./stock-repository";


export interface RepositoryEntryStock {
  id: string;
  productItemId: string;
  date: Date;
  value: number;
  quantity: number;
}

export interface RepositoryCreateEntryStock {
  productItemId: string;
  date: Date;
  value: number;
  quantity: number;
}

export interface EntryStockRepository {
  createEntryAndUpdateStock: (
    entry: RepositoryCreateEntryStock,
    stock: RepositoryCreateStock
  ) => Promise<void>;
  findMany: () => Promise<RepositoryEntryStock[]>;
  findManyByProductItemId: (
    productItemId: string
  ) => Promise<RepositoryEntryStock[]>;
}
