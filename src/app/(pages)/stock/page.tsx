"use client";
import { StockActions } from "@/client/actions/stock-actions";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Suspense } from "react";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { useFetch } from "@/client/hooks/useFetch";
import { Loading } from "@/client/components/ui/loading";

export default function Page() {
  const { data: response, isLoading } = useFetch({
    queryKey: ["products"],
    queryFn: StockActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Estoque" description="" />
          <Button>Faturar</Button>
        </div>
        {isLoading || !response ? (
          <Loading />
        ) : (
          <DataTable searchKey="name" columns={columns} data={response.data} />
        )}
      </div>
    </div>
  );
}
