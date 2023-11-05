import { StockEntryForm } from "../components/forms/entry-form";
import { StockHttp } from "../gateways/stock-http";
import {
  FormStockEntry,
  StockEntrySchema,
} from "../schema/actions/stock-action-schema";

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

  await console.log(parsedParams.data);
}

export const StockActions = {
  getAll,
  entry,
};
