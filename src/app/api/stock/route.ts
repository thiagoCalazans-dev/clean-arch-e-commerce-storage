import { stockController } from "@/server/adapters/controller/stock-controller";

export async function GET() {
  return stockController.Get();
}

export async function POST(request: Request) {
  return stockController.Post(request);
}
