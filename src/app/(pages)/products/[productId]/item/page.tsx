import { ProductActions } from "@/client/actions/product-actions";
import { ProductsClientPage } from "./client";

export default async function ProductsPage() {
  const { data } = await ProductActions.getAll();
  console.log(data);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClientPage data={data} />
      </div>
    </div>
  );
}
