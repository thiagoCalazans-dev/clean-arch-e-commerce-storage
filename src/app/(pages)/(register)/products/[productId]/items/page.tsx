import { ProductItemActions } from "@/client/actions/product-items-actions";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";
import { CreateProductItemModal } from "@/client/components/modal/create-product-item-modal";
import { SizeActions } from "@/client/actions/size-actions";
import { ColorActions } from "@/client/actions/color-actions";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";

export default async function ProductsPage({
  params,
}: {
  params: { productId: string };
}) {
  const { data } = await ProductItemActions.fetchItemsByProduct(
    params.productId
  );

  const { data: size } = await SizeActions.getAll();
  const { data: color } = await ColorActions.getAll();

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Heading
              title={`${data.name} `}
              description={`items (${data.productItem.length})`}
            />
            <ul>
              <li>
                <strong>Categoria: </strong>
                {data.category.name}
              </li>
              <li>
                <strong>Marca: </strong>
                {data.brand.name}
              </li>
              <li>
                <strong>Descrição: </strong>
                <p>{data.description}</p>
              </li>
            </ul>
          </div>
          <div className="self-start">
            <CreateProductItemModal
              color={color}
              size={size}
              productId={params.productId}
            />
          </div>
        </div>
        <Separator />
        <DataTable searchKey="code" columns={columns} data={data.productItem} />
      </div>
    </div>
  );
}
