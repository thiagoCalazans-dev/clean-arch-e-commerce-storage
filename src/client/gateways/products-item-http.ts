import { env } from "../lib/schema/env";
import {
  GetParams,
  GetByIdParams,
  GetByIdReponseSchema,
  PostProductParams,
  PutProductParams,
} from "./schema/product-item-gateway-schema";

export class ProductItemHttp {
  constructor() {}

  async Get(productId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/product/${productId}/item`,
      {
        next: {
          tags: [`${productId}-items`],
        },
        cache: "no-store",
      }
    );
    const json = await response.json();
    return json;
  }

  async Post(data: PostProductParams, productId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/product/${productId}/item`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async GetById({ productId, productItemId }: GetByIdParams) {
    const response = await fetch(
      `${env.API_BASE_URL}/product/${productId}/item/${productItemId}`,
      {
        cache: "no-store",
      }
    );

    const json = await response.json();

    const parsedReponse = GetByIdReponseSchema.safeParse(json);

    if (!parsedReponse.success) {
      throw new Error(parsedReponse.error.message);
    }

    return parsedReponse.data;
  }

  async Put(body: PutProductParams) {
    const response = await fetch(
      `${env.API_BASE_URL}/product/${body.data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  async Delete(productId: string, productItemId: string) {
    const response = await fetch(
      `${env.API_BASE_URL}/product/${productId}/item/${productItemId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}
