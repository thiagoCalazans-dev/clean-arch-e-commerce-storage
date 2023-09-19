import { ProductImageController } from "@/server/adapters/controller/product-image-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { imageId: string } }
) {
  return await ProductImageController.Delete(request, params);
}
