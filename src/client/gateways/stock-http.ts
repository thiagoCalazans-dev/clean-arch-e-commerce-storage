import { Stock } from "../actions/schema/stock-action-schema";
import { env } from "../lib/schema/env";
import { GetStock, PostStockEntyParams } from "./schema/stock-gateway-schema";

export class StockHttp {
  constructor() {}

  async Get() {
    const response = await fetch(`${env.API_BASE_URL}/stock`, {
      next: {
        tags: ["stocks"],
      },
      cache: "no-store",
    });
    const json: GetStock = await response.json();
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
