import { randomUUID } from "node:crypto";
import {
  StockOutRepository,
  RepositoryStockOut,
  RepositoryCreateStockOut,
} from "../stock-out-repository";

export class InMemoryStockOutRepository implements StockOutRepository {
  public StockOuts: RepositoryStockOut[] = [];

  async createStockOutAndUpdateStock(data: RepositoryCreateStockOut) {
    const id = randomUUID();
    const stockOut = {
      ...data,
      id,
    };

    this.StockOuts.push(stockOut);
  }

  async findMany() {
    return this.StockOuts;
  }

  async findManyByProductItemId(
    productItemId: string
  ): Promise<RepositoryStockOut[]> {
    const filteredEntrySotcks = await this.StockOuts.filter((entry) => {
      entry.productItemId = productItemId;
    });
    return filteredEntrySotcks;
  }
}
