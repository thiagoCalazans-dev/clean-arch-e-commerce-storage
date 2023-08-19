"use client";

import { DataTable } from "@/client/components/data-table";
import { columns } from "./columns";

export function BrandsClientPage({ data }: any) {
  return (
    <>
      {/* <div className="flex items-center justify-between">
        <Heading
          title={`Biddings type (${data.length})`}
          description="Manage your biddings type"
        />
        <Button onClick={() => router.push("/biddingtypes/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator /> */}
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
}
