import { randomUUID } from "node:crypto";
import {
  EntryStockRepository,
  RepositoryEntryStock,
  RepositoryCreateEntryStock,
} from "../entry-stock-repository";

export class InMemoryentryEntryStockRepository implements EntryStockRepository {
  public entryEntryStocks: RepositoryEntryStock[] = [];

  async createEntryAndUpdateStock(data: RepositoryCreateEntryStock) {
    const id = randomUUID();
    const entryEntryStock = {
      ...data,
      id,
    };

    this.entryEntryStocks.push(entryEntryStock);
  }

  async findMany() {
    return this.entryEntryStocks;
  }

  async findByProductItemId(
    productItemId: string
  ): Promise<RepositoryEntryStock | null> {
    const entryStocks = this.entryEntryStocks.find(
      (item) => item.productItemId === productItemId
    );
    return entryStocks || null;
  }

}
