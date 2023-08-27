import { ColorActions } from "@/client/actions/color-actions";
import { ColorsClientPage } from "./client";

export default async function ColorsPage() {
  const { data } = await ColorActions.getAll();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClientPage data={data} />
      </div>
    </div>
  );
}
