import { CategoryActions } from "@/client/actions/category-actions";
import { CategoryForm } from "@/client/components/forms/category-form";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const response = await CategoryActions.fetchById(params.categoryId);

  const title = "Category";
  const description = response ? "Edit a category." : "Add a new category";

  const initialData = response ? response.data : null;

  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8  pt-6">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />
        </div>
        <Separator />
        <CategoryForm initialData={initialData} />
      </div>
    </div>
  );
}
