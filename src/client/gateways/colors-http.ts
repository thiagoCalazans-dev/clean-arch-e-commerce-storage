import {
  GetByIdReponseSchema,
  GetByIdParams,
  PostColorParams,
  PutColorParams,
} from "./schema/color-gateway-schema";
import { env } from "../lib/schema/env";

export class ColorHttp {
  constructor() {}

  async Get() {
    const response = await fetch(`${env.API_BASE_URL}/color`, {
      next: {
        tags: ["colors"],
      },
      cache: "no-store",
    });
    const json = await response.json();
    return json;
  }

  async Post(data: PostColorParams) {
    const response = await fetch(`${env.API_BASE_URL}/color`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async GetById(colorId: GetByIdParams) {
    const response = await fetch(`${env.API_BASE_URL}/color/${colorId}`, {
      cache: "no-store",
    });

    const json = await response.json();

    const parsedReponse = GetByIdReponseSchema.safeParse(json);

    if (!parsedReponse.success) {
      throw new Error(parsedReponse.error.message);
    }

    return parsedReponse.data;
  }

  async Put(body: PutColorParams) {
    const response = await fetch(`${env.API_BASE_URL}/color/${body.data.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  async Delete(colorId: string) {
    const response = await fetch(`${env.API_BASE_URL}/color/${colorId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}
