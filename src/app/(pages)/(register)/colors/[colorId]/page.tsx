import { ColorActions } from "@/client/actions/color-actions";
import { ColorForm } from "@/client/components/forms/color-form";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const response = await ColorActions.fetchById(params.colorId);

  const title = "Cor";
  const description = response ? "Edite sua cor." : "Cadastre uma nova cor";

  const initialData = response ? response.data : null;

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8  pt-6">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
        </div>
        <Separator />
        <ColorForm initialData={initialData} />
      </div>
    </div>
  );
}
