import { ProductItemActions } from "@/client/actions/product-items-actions";
import { StockEntryForm } from "@/client/components/forms/entry-form";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function Incoming({
  params,
}: {
  params: { productId: string; productItemId: string };
}) {
  const response = await ProductItemActions.fetchById({
    productId: params.productId,
    productItemId: params.productItemId,
  });

  console.log(response);

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8  pt-6">
        <Heading title="Entrada" />
        <ul>
          <li>
            <strong>Código: </strong>
            <span>{response?.data.code} </span>
          </li>
        </ul>
        <Separator />
        <StockEntryForm productItemId={params.productItemId} />
      </div>
    </div>
  );
}
