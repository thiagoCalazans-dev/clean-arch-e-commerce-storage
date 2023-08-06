import { brandController } from "@/server/adapters/controller/brand-controller";

export async function POST(request: Request) {
  return brandController.Post(request);
}

export async function GET() {
  return brandController.Get();
}
