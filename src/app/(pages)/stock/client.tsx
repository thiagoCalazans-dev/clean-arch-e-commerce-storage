"use client";

import { Heading } from "@/client/components/ui/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";
import { columns } from "./columns";
import { DataTable } from "@/client/components/data-table";

export function StockPage({ data }: any) {
  const router = useRouter();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Estoque" description="" />
          <Button onClick={() => router.push("/incoming")}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>

        <Suspense fallback={<div>Carregando...</div>}>
          <DataTable
            searchKey="productItem.code"
            columns={columns}
            data={data}
          />
        </Suspense>
      </div>
    </div>
  );
}
