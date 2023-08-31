import { ProductActions } from "@/client/actions/product-actions";
import { ProductsClientPage } from "./client";
import { ProductItemActions } from "@/client/actions/product-items-actions";

export default async function ProductsPage({
  params,
}: {
  params: { productId: string };
}) {
  const { data } = await ProductItemActions.fetchItemsByProduct(
    params.productId
  );
  console.log(data);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClientPage data={data} />
      </div>
    </div>
  );
}
