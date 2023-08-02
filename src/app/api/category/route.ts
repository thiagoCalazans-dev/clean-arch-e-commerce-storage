import { categoryController } from "@/server/infra/controller/category-controller";

export async function POST(request: Request) {
  return categoryController.Post(request);
}

export async function GET() {
  return categoryController.Get();
}
