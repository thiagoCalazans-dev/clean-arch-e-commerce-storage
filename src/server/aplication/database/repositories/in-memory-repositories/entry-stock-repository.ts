import { randomUUID } from "node:crypto";
import {
  EntryStockRepository,
  RepositoryEntryStock,
  RepositoryCreateEntryStock,
} from "../entry-stock-repository";

export class InMemoryentryEntryStockRepository implements EntryStockRepository {
  public EntryStocks: RepositoryEntryStock[] = [];

  async createEntryAndUpdateStock(data: RepositoryCreateEntryStock) {
    const id = randomUUID();
    const entryEntryStock = {
      ...data,
      id,
    };

    this.EntryStocks.push(entryEntryStock);
  }

  async findMany() {
    return this.EntryStocks;
  }

  async findManyByProductItemId(
    productItemId: string
  ): Promise<RepositoryEntryStock[]> {
    const filteredEntrySotcks = await this.EntryStocks.filter((entry) => {
      entry.productItemId = productItemId;
    });
    return filteredEntrySotcks;
  }
}
