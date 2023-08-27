import { SizeActions } from "@/client/actions/size-actions";
import { SizesClientPage } from "./client";

export default async function SizesPage() {
  const { data } = await SizeActions.getAll();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClientPage data={data} />
      </div>
    </div>
  );
}
