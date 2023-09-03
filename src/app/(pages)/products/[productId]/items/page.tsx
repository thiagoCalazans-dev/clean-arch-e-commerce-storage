import { ProductItemActions } from "@/client/actions/product-items-actions";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import { ProductImages } from "./image";
import { CellAction } from "./cell-action";

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
        <div className="flex items-center justify-between">
          <Heading
            title={`Products items (${data.productItem.length})`}
            description="Manage your products items"
          />
          <Button>Add new</Button>
        </div>
        <Separator />
        {data.productItem.map((item: any) => {
          return (
            <Card key={item.id}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Item: XXXX-@@@@</CardTitle>
                <CellAction data={data} />
              </CardHeader>
              <CardContent className="grid grid-cols-2">
                <div className="flex flex-col justify-evenly">
                  <p>
                    <strong>Size:</strong> {item.size.name} ({item.size.value})
                  </p>
                  <p>
                    <strong>Color:</strong> {item.color.name}({item.color.value}
                    )
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price}
                  </p>
                  <p>
                    <strong>Descount:</strong> {item.descount}
                  </p>
                </div>
                <div className="flex-1 flex  items-center relative  overflow-x-auto gap-2">
                  <ProductImages data={item.productImages} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
