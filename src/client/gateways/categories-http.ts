import { env } from "../lib/schema/env";
import {
  GetByIdReponseSchema,
  GetByIdParams,
  PostCategoryParams,
  PutCategoryParams,
} from "./schema/category-gateway-schema";

export class CategoryHttp {
  constructor() {}

  async Post(data: PostCategoryParams) {
    const response = await fetch(`${env.API_BASE_URL}/category`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async GetById(categoryId: GetByIdParams) {
    const response = await fetch(`${env.API_BASE_URL}/category/${categoryId}`, {
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
    const response = await fetch(`${env.API_BASE_URL}/category`, {
      next: {
        tags: ["categories"],
      },
      cache: "no-cache",
    });
    const json = await response.json();
    return json;
  }

  async Put(body: PutCategoryParams) {
    const response = await fetch(
      `${env.API_BASE_URL}/category/${body.data.id}`,
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

  async Delete(categoryId: string) {
    const response = await fetch(`${env.API_BASE_URL}/category/${categoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}
