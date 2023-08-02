import { brandController } from "@/server/infra/controller/brand-controller";

export async function GET(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  return await brandController.GetParams(request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: { brandId: string } }
) {
  return await brandController.Put(request, params);
}
