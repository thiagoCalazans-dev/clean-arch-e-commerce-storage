import { SizeActions } from "@/client/actions/size-actions";
import { SizeForm } from "@/client/components/forms/size-form";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const response = await SizeActions.fetchById(params.sizeId);

  const title = "Size";
  const description = response ? "Edit a size." : "Add a new size";

  const initialData = response ? response.data : null;

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8  pt-6">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
        </div>
        <Separator />
        <SizeForm initialData={initialData} />
      </div>
    </div>
  );
}
