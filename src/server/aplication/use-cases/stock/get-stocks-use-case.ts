import { StockRepository } from "@/server/aplication/database/repositories/stock-repository";

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
