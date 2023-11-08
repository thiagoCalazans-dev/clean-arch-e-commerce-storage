import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { Suspense } from "react";
import { BrandActions } from "@/client/actions/brand-actions";
import Link from "next/link";
import { Loading } from "@/client/components/ui/loading";

export default async function Page() {
  const { data } = await BrandActions.getAll();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Marcas" description="Gerencie suas marcas" />
          <Button asChild>
            <Link className="" href="/brands/new">
              Cadastrar
            </Link>
          </Button>
        </div>
        <Separator />
        <Suspense fallback={<Loading />}>
          <DataTable searchKey="name" columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  );
}
