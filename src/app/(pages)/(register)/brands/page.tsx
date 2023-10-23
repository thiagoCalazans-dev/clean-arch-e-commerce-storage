import { BrandActions } from "@/client/actions/brand-actions";
import { BrandsPage } from "./client";

export default async function Page() {
  const { data } = await BrandActions.getAll();

  console.log(data);

  return <BrandsPage data={data} />;
}
