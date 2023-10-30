import { StockRepository } from "@/server/adapters/database/repositories/stock-repository";

export class GetStocksUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute() {
    const stocks = await this.stockRepository.findMany();

    const output = {
      data: stocks,
    };

    return output;
  }
}
