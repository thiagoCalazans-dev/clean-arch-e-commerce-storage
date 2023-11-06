import { SizeHttp } from "../gateways/sizes-http";

import {
  Size,
  SizeSchema,
  CreateSize,
  CreateSizeSchema,
  fetchSizeByIdParamsSchema,
  removeSizeByIdParams,
  removeSizeByIdParamsSchema,
} from "./schema/size-actions-schema";

const sizeHttp = new SizeHttp();

async function getAll() {
  return sizeHttp.Get();
}

async function fetchById(sizeId: string) {
  const parsedParams = fetchSizeByIdParamsSchema.safeParse(sizeId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  return await sizeHttp.GetById(parsedParams.data);
}

async function update(size: Size) {
  const parsedParams = SizeSchema.safeParse(size);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: size,
  };

  await sizeHttp.Put(body);
}

async function create(size: CreateSize) {
  const parsedParams = CreateSizeSchema.safeParse(size);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: size,
  };

  await sizeHttp.Post(body);
}

async function remove(sizeId: removeSizeByIdParams) {
  const parsedParams = removeSizeByIdParamsSchema.safeParse(sizeId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await sizeHttp.Delete(sizeId);
}

export const SizeActions = {
  create,
  getAll,
  fetchById,
  remove,
  update,
};
