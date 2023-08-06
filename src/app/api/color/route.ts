import { colorController } from "@/server/infra/controller/color-controller";

export async function POST(request: Request) {
  return colorController.Post(request);
}

export async function GET() {
  return colorController.Get();
}
