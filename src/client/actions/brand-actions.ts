import { BASE_URL } from "../lib/utils";
import {
  Brand,
  BrandSchema,
  CreateBrand,
  CreateBrandSchema,
  fetchBrandByIdParamsSchema,
  removeBrandByIdParams,
} from "../schema/actions/brand-actions-schema";
import { BrandHttp } from "../gateways/brands-http";

const brandHttp = new BrandHttp();

async function getAll() {
  return brandHttp.Get();
}

async function fetchById(brandId: string) {
  const parsedParams = fetchBrandByIdParamsSchema.safeParse(brandId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  return await brandHttp.GetById(parsedParams.data);
}

async function update(brand: Brand) {
  const parsedParams = BrandSchema.safeParse(brand);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: brand,
  };

  await brandHttp.Put(body);
}

async function create(brand: CreateBrand) {
  const parsedParams = CreateBrandSchema.safeParse(brand);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: brand,
  };

  await brandHttp.Post(body);
}

async function remove(brandId: string) {
  const parsedParams = fetchBrandByIdParamsSchema.safeParse(brandId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await brandHttp.Delete(brandId);
}

export const BrandActions = {
  create,
  getAll,
  fetchById,
  remove,
  update,
};
