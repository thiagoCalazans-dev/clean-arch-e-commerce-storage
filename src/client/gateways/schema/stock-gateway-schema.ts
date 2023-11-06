import { Stock, StockEntry } from "../../actions/schema/stock-action-schema";

export type GetStock = {
  data: Stock[];
};

export type PostStockEntyParams = {
  data: StockEntry;
};
