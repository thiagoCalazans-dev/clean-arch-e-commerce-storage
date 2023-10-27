import { randomUUID } from "node:crypto";
import {
  StockRepository,
  RepositoryStock,
  RepositoryCreateStock,
} from "../stock-repository";

export class InMemorystockRepository implements StockRepository {
  public stocks: RepositoryStock[] = [];

  async create(data: RepositoryCreateStock) {
    const id = randomUUID();
    const stock = {
      ...data,
      id,
    };

    this.stocks.push(stock);
  }

  async findMany() {
    return this.stocks;
  }

  async findByProductItemId(
    productItemId: string
  ): Promise<RepositoryStock | null> {
    const stocks = this.stocks.find(
      (item) => item.productItemId === productItemId
    );
    return stocks || null;
  }

  async findById(id: string): Promise<RepositoryStock | null> {
    const stocks = this.stocks.find((item) => item.id === id);
    return stocks || null;
  }
}
