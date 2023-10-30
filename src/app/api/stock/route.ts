import { stockController } from "@/server/adapters/controller/stock-controller";

export async function GET() {
  return stockController.Get();
}
