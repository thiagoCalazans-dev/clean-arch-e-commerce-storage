import { CategoryActions } from "@/client/actions/category-actions";
import { CategoriesClientPage } from "./client";

export default async function CategoriesPage() {
  const { data } = await CategoryActions.getAll();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClientPage data={data} />
      </div>
    </div>
  );
}
