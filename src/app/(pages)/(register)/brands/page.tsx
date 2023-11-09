"use client";
import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { BrandActions } from "@/client/actions/brand-actions";
import Link from "next/link";
import { Loading } from "@/client/components/ui/loading";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: BrandActions.getAll,
  });

  console.log(response)

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
        {isLoading ? (
          <Loading />
        ) : (
          <DataTable searchKey="name" columns={columns} data={response!.data} />
        )}
      </div>
    </div>
  );
}
