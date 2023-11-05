import { NextResponse } from "next/server";
import {
  makeEntryStockUseCase,
  makeGetStocksUseCase,
} from "../factories/makeStockUseCase";
import { ResourceNotFoundError } from "@/server/aplication/error/ResourceNotFoundError";
import { StockEntryDTO } from "@/server/aplication/dto/stock-entry-DTO";

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

  async Post(request: Request) {
    const body: StockEntryDTO = await request.json();
    console.log(body);

    try {
      const createProductItemUseCase = makeEntryStockUseCase();
      await createProductItemUseCase.execute(body);

      return NextResponse.json(null, { status: 200 });
    } catch (error) {
      if (error instanceof ResourceNotFoundError)
        return NextResponse.json(null, {
          status: 404,
          statusText: error.message,
        });

      return NextResponse.json(null, {
        status: 500,
        statusText: "Something went wrong!",
      });
    }
  }
}

export const stockController = new StockController();
