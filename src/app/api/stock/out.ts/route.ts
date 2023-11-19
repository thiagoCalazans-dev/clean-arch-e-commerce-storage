import { stockController } from "@/server/adapters/controller/stock-controller";

export async function POST(request: Request) {
  return stockController.StockOut(request);
}
