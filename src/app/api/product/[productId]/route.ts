import { productController } from "@/server/adapters/controller/product-controller";
import { productItemController } from "@/server/adapters/controller/product-item-controller";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  return await productController.GetParams(request, params);
}

export async function POST(
  request: Request,
  { params }: { params: { productId: string } }
) {
  return productItemController.Post(request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: { productId: string } }
) {
  return await productController.Put(request, params);
}

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  return await productController.Delete(request, params);
}
