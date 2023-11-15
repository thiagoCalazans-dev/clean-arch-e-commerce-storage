"use client";
import { SizeActions } from "@/client/actions/size-actions";
import { DataTable } from "@/client/components/data-table";
import { Button } from "@/client/components/ui/button";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";
import { columns } from "./columns";
import Link from "next/link";
import { Suspense } from "react";
import { Loading } from "@/client/components/ui/loading";
import { useFetch } from "@/client/hooks/useFetch";

export default function SizesPage() {
  const { data: response, isLoading } = useFetch({
    queryKey: ["sizes"],
    queryFn: SizeActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Sizes`} description="Manage your sizes" />
          <Button asChild>
            <Link className="" href="/sizes/new">
              Cadastrar
            </Link>
          </Button>
        </div>
        <Separator />
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
