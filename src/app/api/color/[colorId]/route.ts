import { colorController } from "@/server/adapters/controller/color-controller";

export async function GET(
  request: Request,
  { params }: { params: { colorId: string } }
) {
  return await colorController.GetParams(request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: { colorId: string } }
) {
  return await colorController.Put(request, params);
}

export async function DELETE(
  request: Request,
  { params }: { params: { colorId: string } }
) {
  return await colorController.Delete(request, params);
}
