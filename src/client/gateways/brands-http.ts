import { BASE_URL } from "../lib/utils";
import {
  GetByIdReponseSchema,
  GetByIdParams,
  PostBrandParams,
  PutBrandParams,
} from "../schema/gateway/brand-gateway-schema";

export class BrandHttp {
  constructor() {}

  async Post(data: PostBrandParams) {
    const response = await fetch(`${BASE_URL}/brand`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async GetById(brandId: GetByIdParams) {
    const response = await fetch(`${BASE_URL}/brand/${brandId}`, {
      cache: "no-store",
    });

    const json = await response.json();

    const parsedReponse = GetByIdReponseSchema.safeParse(json);

    if (!parsedReponse.success) {
      throw new Error(parsedReponse.error.message);
    }

    return parsedReponse.data;
  }

  async Get() {
    const response = await fetch(`${BASE_URL}/brand`, {
      next: {
        tags: ["brands"],
      },
    });
    const json = await response.json();
    return json;
  }

  async Put(body: PutBrandParams) {
    const response = await fetch(`${BASE_URL}/brand/${body.data.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  async Delete(brandId: string) {
    const response = await fetch(`${BASE_URL}/brand/${brandId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}