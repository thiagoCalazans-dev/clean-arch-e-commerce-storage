import { env } from "../lib/schema/env";
import {
  GetByIdReponseSchema,
  GetByIdParams,
  PostSizeParams,
  PutSizeParams,
  GetSize,
} from "./schema/size-gateway-schema";

export class SizeHttp {
  constructor() {}

  async Get() {
    const response = await fetch(`${env.API_BASE_URL}/size`);
    const json: GetSize = await response.json();
    return json;
  }

  async Post(data: PostSizeParams) {
    const response = await fetch(`${env.API_BASE_URL}/size`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async GetById(sizeId: GetByIdParams) {
    const response = await fetch(`${env.API_BASE_URL}/size/${sizeId}`, {
      cache: "no-store",
    });

    const json = await response.json();

    const parsedReponse = GetByIdReponseSchema.safeParse(json);

    if (!parsedReponse.success) {
      throw new Error(parsedReponse.error.message);
    }

    return parsedReponse.data;
  }

  async Put(body: PutSizeParams) {
    const response = await fetch(`${env.API_BASE_URL}/size/${body.data.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    return result;
  }

  async Delete(sizeId: string) {
    const response = await fetch(`${env.API_BASE_URL}/size/${sizeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}
