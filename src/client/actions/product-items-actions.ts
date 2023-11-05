import { ProductItemHttp } from "../gateways/products-item-http";
import {
  CreateProductItem,
  CreateProductItemSchema,
  fetchProductItemByIdParams,
  fetchProductItemByIdParamsSchema,
  removeProductItemByIdParams,
  removeProductItemByIdParamsSchema,
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

async function remove(params: removeProductItemByIdParams) {
  const parsedParams = removeProductItemByIdParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const { productId, productItemId } = parsedParams.data;

  await productItemHttp.Delete(productId, productItemId);
}

async function fetchById({
  productId,
  productItemId,
}: fetchProductItemByIdParams) {
  const parsedParams = fetchProductItemByIdParamsSchema.safeParse({
    productId,
    productItemId,
  });

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  return await productItemHttp.GetById(parsedParams.data);
}

export const ProductItemActions = {
  fetchItemsByProduct,
  create,
  remove,
  fetchById,
};
