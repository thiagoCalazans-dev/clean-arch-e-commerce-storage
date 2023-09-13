import { BASE_URL } from "../lib/utils";
import { PostProductImageParams } from "../schema/gateway/product-image-gateway-schema";

export class ProductImageHttp {
  constructor() {}

  async Post(body: PostProductImageParams, productId: string) {
    const { data } = body;

    const response = await fetch(
      `${BASE_URL}/product/${productId}/item/${data.productItemId}/image}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }
}
