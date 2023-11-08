import { StockActions } from "@/client/actions/stock-actions";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Suspense } from "react";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const response = { data: [] };

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Estoque" description="" />
            <Button>Faturar</Button>
          </div>

          <Suspense fallback={<div>Carregando...</div>}>
            <DataTable
              searchKey="productItem.code"
              columns={columns}
              data={response.data}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
