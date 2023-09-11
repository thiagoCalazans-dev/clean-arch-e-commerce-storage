import { imageController } from "@/server/adapters/controller/image-controller";

export async function DELETE(
  request: Request,
  { params }: { params: { imageId: string } }
) {
  return await imageController.Delete(request, params);
}
