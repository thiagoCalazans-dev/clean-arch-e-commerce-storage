import { env } from "../lib/schema/env";
import { PostProductImageParams } from "./schema/product-image-gateway-schema";

export class ProductImageHttp {
  constructor() {}

  async Post(body: PostProductImageParams, productId: string) {
    const { data } = body;

    console.log(data);

    const url = `${env.API_BASE_URL}/product/${productId}/item/${data.productItemId}/image`;

    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }
}
