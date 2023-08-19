import { BrandActions } from "@/client/actions/brand-action";
import { BrandForm } from "@/client/components/forms/brand-form";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function BrandPage({
  params,
}: {
  params: { brandId: string };
}) {
  const response = await BrandActions.fetchById(params.brandId);

  const title = "Brand";
  const description = response ? "Edit a brand." : "Add a new brand";

  const initialData = response ? response.data : null;

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8  pt-6">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
        </div>
        <Separator />
        <BrandForm initialData={initialData} />
      </div>
    </div>
  );
}
