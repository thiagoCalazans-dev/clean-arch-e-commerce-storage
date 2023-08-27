import { ProductActions } from "@/client/actions/product-actions";
import { ProductForm } from "@/client/components/forms/product-form";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const response = await ProductActions.fetchById(params.productId);

  const title = "Product";
  const description = response ? "Edit a product." : "Add a new product";

  const initialData = response ? response.data : null;

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8  pt-6">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
        </div>
        <Separator />
        <ProductForm initialData={initialData} />
      </div>
    </div>
  );
}
