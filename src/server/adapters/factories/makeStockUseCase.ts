import { GetStocksUseCase } from "@/server/aplication/use-cases/stock/get-stocks-use-case";
import { PrismaStockRepository } from "../../aplication/database/repositories/prisma/stock-prisma-repository";
import { PrismaEntryStockRepository } from "@/server/aplication/database/repositories/prisma/entry-stock-prisma-repository";
import { EntryStockUseCase } from "@/server/aplication/use-cases/stock/entry-stock-use-case";

export function makeGetStocksUseCase() {
  const stockRepository = new PrismaStockRepository();
  const usecase = new GetStocksUseCase(stockRepository);

  return usecase;
}

export function makeEntryStockUseCase() {
  const stockRepository = new PrismaStockRepository();
  const entryRepository = new PrismaEntryStockRepository();
  const useCase = new EntryStockUseCase(stockRepository, entryRepository);
  return useCase;
}
