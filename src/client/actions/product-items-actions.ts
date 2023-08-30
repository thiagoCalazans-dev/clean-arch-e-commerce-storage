import { ProductHttp } from "../gateways/products-http";

import {
  Product,
  ProductSchema,
  CreateProduct,
  CreateProductSchema,
  fetchProductByIdParamsSchema,
  removeProductByIdParams,
  removeProductByIdParamsSchema,
} from "../schema/actions/product-actions-schema";

const productHttp = new ProductHttp();

async function getAll() {
  return productHttp.Get();
}

async function fetchById(productId: string) {
  const parsedParams = fetchProductByIdParamsSchema.safeParse(productId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  return await productHttp.GetById(parsedParams.data);
}

async function update(product: Product) {
  const parsedParams = ProductSchema.safeParse(product);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: product,
  };

  await productHttp.Put(body);
}

async function create(product: CreateProduct) {
  const parsedParams = CreateProductSchema.safeParse(product);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: product,
  };

  await productHttp.Post(body);
}

async function remove(productId: removeProductByIdParams) {
  const parsedParams = removeProductByIdParamsSchema.safeParse(productId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await productHttp.Delete(productId);
}

export const ProductActions = {
  create,
  getAll,
  fetchById,
  remove,
  update,
};
