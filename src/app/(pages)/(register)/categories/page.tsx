"use client";
import { CategoryActions } from "@/client/actions/category-actions";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Separator } from "@/client/components/ui/separator";
import { Loading } from "@/client/components/ui/loading";
import { useFetch } from "@/client/hooks/useFetch";

export default function Page() {
  const { data: response, isLoading } = useFetch({
    queryKey: ["categories"],
    queryFn: CategoryActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Categories" description="Manage your categories" />
          <Button asChild>
            <Link className="" href="/categories/new">
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
