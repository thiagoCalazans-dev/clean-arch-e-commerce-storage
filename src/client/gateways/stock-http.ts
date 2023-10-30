import { env } from "../schema/env";

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
}
