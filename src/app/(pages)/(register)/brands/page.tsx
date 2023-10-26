import { BrandActions } from "@/client/actions/brand-actions";
import { BrandsPage } from "./client";

export default async function Page() {
  const { data } = await BrandActions.getAll();

  return <BrandsPage data={data} />;
}
