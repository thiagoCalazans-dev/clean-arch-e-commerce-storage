"use client";

import { SizeActions } from "@/client/actions/size-actions";
import { DataTable } from "@/client/components/data-table";
import { Button } from "@/client/components/ui/button";
import { Heading } from "@/client/components/ui/heading";
import { Separator } from "@/client/components/ui/separator";
import { Size } from "@/client/schema/actions/size-actions-schema";
import { PlusIcon } from "@radix-ui/react-icons";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { GetSize } from "@/client/schema/gateway/size-gateway-schema";

export default function SizesPage() {
  const { data, isLoading } = useQuery<GetSize>({
    queryKey: ["sizes"],
    queryFn: SizeActions.getAll,
  });

  const router = useRouter();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title={`Sizes`} description="Manage your sizes" />
          <Button onClick={() => router.push("/sizes/new")}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <Separator />
        {isLoading ? (
          <div>carrgando</div>
        ) : (
          <DataTable searchKey="name" columns={columns} data={data!.data} />
        )}
      </div>
    </div>
  );
}
