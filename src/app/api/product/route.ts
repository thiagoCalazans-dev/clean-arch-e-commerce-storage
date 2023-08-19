import { productController } from "@/server/adapters/controller/product-controller";

export async function POST(request: Request) {
  return productController.Post(request);
}

export async function GET() {
  return productController.Get();
}
