import { ProductImageController } from "@/server/adapters/controller/product-image-controller";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { itemId: string } }
) {
  console.log(params);
  return ProductImageController.Post(request, params);
}

export async function GET() {
  return NextResponse.json({ data: "hello world" });
}
