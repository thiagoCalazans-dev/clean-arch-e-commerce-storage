"use client";

import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { ColorActions } from "@/client/actions/color-actions";

export default function ColorsPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: ColorActions.getAll,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Colors`} description="Manage your colors" />
          <Button onClick={() => router.push("/colors/new")}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />
        {isLoading ? (
          <div>carregando</div>
        ) : (
          <DataTable searchKey="name" columns={columns} data={data!.data} />
        )}
      </div>
    </div>
  );
}
