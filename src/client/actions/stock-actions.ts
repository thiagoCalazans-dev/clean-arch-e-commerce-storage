import { StockHttp } from "../gateways/stock-http";
import { FormStockEntry, StockEntrySchema } from "./schema/stock-action-schema";

const stockHttp = new StockHttp();

async function getAll() {
  return stockHttp.Get();
}

async function entry(entry: FormStockEntry) {
  const formatedIsoDate = new Date(entry.date).toISOString();

  const parsedParams = StockEntrySchema.safeParse({
    ...entry,
    date: formatedIsoDate,
  });

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await stockHttp.Post({ data: parsedParams.data });
}

export const StockActions = {
  getAll,
  entry,
};
