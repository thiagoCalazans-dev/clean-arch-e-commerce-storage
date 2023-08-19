import { productController } from "@/server/adapters/controller/product-controller";
import { productItemController } from "@/server/adapters/controller/product-item-controller";

export async function GET(
  request: Request,
  { params }: { params: { productId: string; itemId: string } }
) {
  return await productItemController.GetParams(request, params);
}

export async function DELETE(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  return await productItemController.Delete(request, params);
}
