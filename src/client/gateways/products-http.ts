import { env } from "../schema/env";
import {
  GetByIdReponseSchema,
  GetByIdParams,
  PostProductParams,
  PutProductParams,
} from "../schema/gateway/product-gateway-schema";

export class ProductHttp {
  constructor() {}

  async Get() {
    const response = await fetch(`${env.API_BASE_URL}/product`, {
      next: {
        tags: ["products"],
      },
      cache: "no-cache",
    });
    const json = await response.json();
    return json;
  }

  async Post(data: PostProductParams) {
    const response = await fetch(`${env.API_BASE_URL}/product`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async GetById(productId: GetByIdParams) {
    const response = await fetch(`${env.API_BASE_URL}/product/${productId}`, {
      cache: "no-store",
    });

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

  async Delete(productId: string) {
    const response = await fetch(`${env.API_BASE_URL}/product/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}
