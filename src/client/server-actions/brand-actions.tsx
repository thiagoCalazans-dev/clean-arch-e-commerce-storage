import {
  Brand,
  BrandSchema,
  CreateBrand,
  CreateBrandSchema,
  fetchBrandByIdParamsSchema,
  removeBrandByIdParams,
  removeBrandByIdParamsSchema,
} from "./schema/brand-actions-schema";
import { BrandHttp } from "../gateways/brands-http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/tanstack-query";
import { useOnResponseStatus } from "../hooks/use-on-response-status";
import { GetBrandsResponse } from "../gateways/schema/brand-gateway-schema";

const brandHttp = new BrandHttp();

export function useBrandActions() {
  const { onError, onSuccess } = useOnResponseStatus();

  function Create(brand: CreateBrand) {
    const parsedParams = CreateBrandSchema.safeParse(brand);

    if (!parsedParams.success) {
      throw new Error(parsedParams.error.message);
    }

    const body = {
      data: brand,
    };

    return useMutation({
      mutationFn: async () => {
        return await brandHttp.Post(body);
      },
      onSuccess: () => {
        onSuccess("brand created");
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
      onError: (error: Error) => {
        onError(error.message);
      },
    });
  }

  function GetAll() {
    return useQuery<GetBrandsResponse>({
      queryKey: ["brands"],
      queryFn: async () => await brandHttp.Get(),
    });
  }

  return {
    Create,
    GetAll,
  };
}

async function fetchById(brandId: string) {
  const parsedParams = fetchBrandByIdParamsSchema.safeParse(brandId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  return await brandHttp.GetById(parsedParams.data);
}

export const BrandActions = {
  fetchById,
};

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

async function remove(brandId: removeBrandByIdParams) {
  const parsedParams = removeBrandByIdParamsSchema.safeParse(brandId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await brandHttp.Delete(brandId);
}
