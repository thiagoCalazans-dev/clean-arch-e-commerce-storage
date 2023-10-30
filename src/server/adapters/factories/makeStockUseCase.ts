import { GetStocksUseCase } from "@/server/aplication/use-cases/stock/get-stocks-use-case";
import { PrismaStockRepository } from "../database/repositories/prisma/stock-prisma-repository";

export function makeGetStocksUseCase() {
  const stockRepository = new PrismaStockRepository();
  const usecase = new GetStocksUseCase(stockRepository);

  return usecase;
}
