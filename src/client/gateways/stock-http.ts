import { env } from "../lib/schema/env";
import { PostStockEntyParams } from "./schema/stock-gateway-schema";

export class StockHttp {
  constructor() {}

  async Get() {
    const response = await fetch(`${env.API_BASE_URL}/stock`, {
      next: {
        tags: ["stocks"],
      },
      cache: "no-cache",
    });
    const json = await response.json();
    return json;
  }

  async Post(data: PostStockEntyParams) {
    const URL = `${env.API_BASE_URL}/stock`;
    console.log(URL);

    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    await response.json();
  }
}
