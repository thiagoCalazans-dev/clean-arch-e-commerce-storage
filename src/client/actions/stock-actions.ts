import { StockHttp } from "../gateways/stock-http";

const stockHttp = new StockHttp();

async function getAll() {
  return stockHttp.Get();
}

export const StockActions = {
  getAll,
};
