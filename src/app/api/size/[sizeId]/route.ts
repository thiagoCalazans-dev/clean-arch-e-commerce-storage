import { sizeController } from "@/server/adapters/controller/size-controller";

export async function GET(
  request: Request,
  { params }: { params: { sizeId: string } }
) {
  return await sizeController.GetParams(request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: { sizeId: string } }
) {
  return await sizeController.Put(request, params);
}

export async function DELETE(
  request: Request,
  { params }: { params: { sizeId: string } }
) {
  return await sizeController.Delete(request, params);
}
