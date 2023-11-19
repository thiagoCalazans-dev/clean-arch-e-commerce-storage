import { NextResponse } from "next/server";
import {
  makeEntryStockUseCase,
  makeGetStocksUseCase,
  makeStockOutUseCase,
} from "../factories/makeStockUseCase";
import { ResourceNotFoundError } from "@/server/aplication/error/ResourceNotFoundError";
import { StockEntryDTO } from "@/server/aplication/dto/stock-entry-DTO";
import { StockOutDTO } from "@/server/aplication/dto/stock-out-dto";

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

  async StockEntry(request: Request) {
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

  async StockOut(request: Request) {
    const body: StockOutDTO = await request.json();
    console.log(body);

    try {
      const stockOutUseCase = makeStockOutUseCase();
      await stockOutUseCase.execute(body);

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
