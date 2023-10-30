import { NextResponse } from "next/server";
import { makeGetStocksUseCase } from "../factories/makeStockUseCase";

class StockController {
  async Get() {
    try {
      const getStocksUseCase = makeGetStocksUseCase();
      const stocks = await getStocksUseCase.execute();
      return NextResponse.json(stocks, { status: 200 });
    } catch (error) {
      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}

export const stockController = new StockController();
