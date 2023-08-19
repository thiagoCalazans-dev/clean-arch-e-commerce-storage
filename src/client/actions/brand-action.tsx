import { BASE_URL } from "../lib/utils";
import {
  fetchBrandByIdParamsSchema,
  fetchBrandByIdReponse,
  fetchBrandByIdReponseSchema,
} from "../schema/brand-schema";

async function getAll() {
  const response = await fetch(`${BASE_URL}/biddingTypes`, {
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
  const response = await fetch(`${BASE_URL}/biddingTypes/${brandId}`, {
    cache: "no-store",
  });

  const json: fetchBrandByIdReponse = await response.json();

  const parsedReponse = fetchBrandByIdReponseSchema.safeParse(json);

  if (!parsedReponse.success) {
    console.log(parsedReponse.error);
    return;
  }

  return parsedReponse.data;
}

export const BrandActions = {
  getAll,
  fetchById,
};
