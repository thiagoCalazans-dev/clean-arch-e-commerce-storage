import { categoryController } from "@/server/infra/controller/category-controller";

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  return await categoryController.GetParams(request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  return await categoryController.Put(request, params);
}
