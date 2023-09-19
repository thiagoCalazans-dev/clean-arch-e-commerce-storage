import { ProductImageHttp } from "../gateways/products-image-http";
import {
  CreateProductImage,
  CreateProductImageSchema,
} from "../schema/actions/product-image-actions-schema";

const productImageHttp = new ProductImageHttp();

async function create(item: CreateProductImage, productId: string) {
  console.log(item);

  const parsedParams = CreateProductImageSchema.safeParse(item);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: parsedParams.data,
  };

  console.log(body);
  await productImageHttp.Post(body, productId);
}

export const ProductImageActions = {
  create,
};
