import { BrandActions } from "@/client/actions/brand-actions";
import { BrandsClientPage } from "./client";

export default async function BrandsPage() {
  const { data } = await BrandActions.getAll();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BrandsClientPage data={data} />
      </div>
    </div>
  );
}
