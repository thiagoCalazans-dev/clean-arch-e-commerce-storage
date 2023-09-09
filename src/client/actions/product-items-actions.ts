import { ProductItemHttp } from "../gateways/products-item-http";
import {
  CreateProductItem,
  CreateProductItemSchema,
} from "../schema/actions/product-item-actions-schema";

const productItemHttp = new ProductItemHttp();

async function fetchItemsByProduct(productId: string) {
  return productItemHttp.Get(productId);
}

async function create(item: CreateProductItem, productId: string) {

  const parsedParams = CreateProductItemSchema.safeParse(item);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }


  const body = {
    data: parsedParams.data,
  };



  await productItemHttp.Post(body, productId);
}

export const ProductItemActions = {
  fetchItemsByProduct,
  create,
};
