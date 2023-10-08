"use client";

import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { CategoryActions } from "@/client/actions/category-actions";

export default function CategoriesPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Categories" description="Manage your categories" />
          <Button onClick={() => router.push("/categories/new")}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />
        {isLoading ? (
          <div>carrgando</div>
        ) : (
          <DataTable searchKey="name" columns={columns} data={data!.data} />
        )}
      </div>
    </div>
  );
}
