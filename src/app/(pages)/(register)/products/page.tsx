"use client";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { ProductActions } from "@/client/actions/product-actions";
import { Loading } from "@/client/components/ui/loading";
import Link from "next/link";
import { useFetch } from "@/client/hooks/useFetch";

export default function ProductsPage() {
  const { data: response, isLoading } = useFetch({
    queryKey: ["products"],
    queryFn: ProductActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Products" description="Manage your products" />
          <Button asChild>
            <Link className="" href="/products/new">
              Cadastrar
            </Link>
          </Button>
        </div>
        <Separator />
        {isLoading || !response ? (
          <Loading />
        ) : (
          <DataTable searchKey="name" columns={columns} data={response.data} />
        )}
      </div>
    </div>
  );
}
