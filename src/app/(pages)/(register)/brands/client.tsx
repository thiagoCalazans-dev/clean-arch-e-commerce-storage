"use client";

import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";
import { Heading } from "@/client/components/ui/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/ui/button";
import { Separator } from "@/client/components/ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";

export function BrandsClientPage({ data }: any) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Brands (${data.length})`}
          description="Manage your brands"
        />
        <Button onClick={() => router.push("/brands/new")}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
}
