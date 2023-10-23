import { ProductItemActions } from "@/client/actions/product-items-actions";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import { ProductImages } from "./image";
import { CreateProductItemModal } from "@/client/components/modal/create-product-item-modal";
import { SizeActions } from "@/client/actions/size-actions";
import { ColorActions } from "@/client/actions/color-actions";
import { CreateProductImageModal } from "@/client/components/modal/create-product-image-modal";
import { DeleteProductItemButton } from "@/client/components/buttons/remove-product-item-button";

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
          <Heading
            title={`${data.name} `}
            description={`items (${data.productItem.length})`}
          />

          <CreateProductItemModal
            color={color}
            size={size}
            productId={params.productId}
          />
        </div>
        <Separator />
        <section className="grid md:grid-cols-4 gap-4 ">
          {data.productItem.map((item: any) => {
            return (
              <Card key={item.id}>
                <CardContent className="grid gap-2 ">
                  <div>
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle className="uppercase">{item.code}</CardTitle>
                      <DeleteProductItemButton
                        productId={data.id}
                        productItemId={item.id}
                        name={item.code}
                      />
                    </CardHeader>

                    <div className="flex flex-col justify-evenly">
                      <p>
                        <strong>Size:</strong> {item.size.name} (
                        {item.size.value})
                      </p>
                      <p>
                        <strong>Color:</strong> {item.color.name}(
                        {item.color.value})
                      </p>
                      <p>
                        <strong>Price:</strong> {item.price}
                      </p>
                      <p>
                        <strong>Descount:</strong> {item.descount}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-3 space-y-1.5 pt-6  items-center relative h-full  overflow-x-auto gap-2">
                    <ProductImages data={item.productImages} />
                  </div>
                  <CreateProductImageModal
                    productId={params.productId}
                    productItemId={item.id}
                  />
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
