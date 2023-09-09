import { productItemController } from "@/server/adapters/controller/product-item-controller";
import { CodeSandboxLogoIcon } from "@radix-ui/react-icons";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  return await productItemController.Get(request, params);
}

export async function POST(
  request: Request,
  { params }: { params: { productId: string } }
) {
  console.log("aquii");
  return productItemController.Post(request, params);
}
