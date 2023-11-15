"use client";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { ColorActions } from "@/client/actions/color-actions";
import Link from "next/link";
import { Suspense } from "react";
import { Loading } from "@/client/components/ui/loading";
import { useFetch } from "@/client/hooks/useFetch";

export default function ColorsPage() {
  const { data: response, isLoading } = useFetch({
    queryKey: ["colors"],
    queryFn: ColorActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Cores" description="Gerencie suas cores" />
          <Button asChild>
            <Link className="" href="/colors/new">
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
