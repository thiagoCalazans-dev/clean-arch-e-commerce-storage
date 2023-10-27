import { RepositoryStock } from "./stock-repository";

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
    stock: RepositoryStock
  ) => Promise<void>;
  findMany: () => Promise<RepositoryEntryStock[]>;
  findByProductItemId: (
    productItemId: string
  ) => Promise<RepositoryEntryStock | null>;
}
