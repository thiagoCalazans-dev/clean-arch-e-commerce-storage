import { StockActions } from "@/client/actions/stock-actions";
import { StockPage } from "./client";

export default async function Page() {
  const { data } = await StockActions.getAll();

  return (
    <>
      <StockPage data={data} />
    </>
  );
}
