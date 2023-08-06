import { sizeController } from "@/server/adapters/controller/size-controller";

export async function POST(request: Request) {
  return sizeController.Post(request);
}

export async function GET() {
  return sizeController.Get();
}
