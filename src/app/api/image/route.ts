import { imageController } from "@/server/adapters/controller/image-controller";

export async function POST(request: Request) {
  console.log(request);
  return imageController.Post(request);
}

export async function GET() {
  return imageController.Get();
}
