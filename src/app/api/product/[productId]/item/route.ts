import { productItemController } from "@/server/adapters/controller/product-item-controller";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  return await productItemController.Get(request, params);
}
