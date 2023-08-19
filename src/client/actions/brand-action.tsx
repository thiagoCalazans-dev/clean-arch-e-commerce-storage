import { BASE_URL } from "../lib/utils";
import {
  Brand,
  fetchBrandByIdParamsSchema,
  fetchBrandByIdReponseSchema,
  removeBrandByIdParams,
} from "../schema/brand-schema";

async function getAll() {
  const response = await fetch(`${BASE_URL}/brand`, {
    next: {
      tags: ["biddingTypes"],
    },
  });
  const json = await response.json();
  return json;
}

async function fetchById(brandId: string) {
  const parsedParams = fetchBrandByIdParamsSchema.safeParse(brandId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }
  const response = await fetch(`${BASE_URL}/brand/${brandId}`, {
    cache: "no-store",
  });

  const json = await response.json();

  const parsedReponse = fetchBrandByIdReponseSchema.safeParse(json);

  if (!parsedReponse.success) {
    console.log(parsedReponse.error);
    return;
  }

  return parsedReponse.data;
}

async function create(brand: Brand) {
  const body = {
    data: brand,
  };

  const response = await fetch(`${BASE_URL}/brand`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const result = await response.json();
  return result;
}

async function remove({ brandId, onError }: removeBrandByIdParams) {
  const parsedParams = fetchBrandByIdParamsSchema.safeParse(brandId);

  if (!parsedParams.success) {
    onError(parsedParams.error.message);
    return;
  }

  const response = await fetch(`${BASE_URL}/brand/${brandId}`, {
    method: "DELETE",
  });
  const json = await response.json();
  return json || null;
}

export const BrandActions = {
  create,
  getAll,
  fetchById,
  remove,
};
