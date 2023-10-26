"use client";

import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ProductActions } from "@/client/actions/product-actions";

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: ProductActions.getAll,
  });
  const router = useRouter();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Products" description="Manage your products" />
          <Button onClick={() => router.push("/products/new")}>
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
