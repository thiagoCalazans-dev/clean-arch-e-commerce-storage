import { env } from "../lib/schema/env";
import { PostImageParams } from "./schema/image-gateway-schema";

export class ImageHttp {
  constructor() {}

  async Get() {
    const response = await fetch(`${env.API_BASE_URL}/image`, {
      next: {
        tags: ["images"],
      },
      cache: "no-store",
    });
    const json = await response.json();
    return json;
  }

  async Post(data: PostImageParams) {
    const response = await fetch(`${env.API_BASE_URL}/image`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }

  async Delete(imageId: string) {
    const response = await fetch(`${env.API_BASE_URL}/image/${imageId}`, {
      method: "DELETE",
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    return json || null;
  }
}
