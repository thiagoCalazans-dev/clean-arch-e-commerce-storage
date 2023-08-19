"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BrandsColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<BrandsColumn>[] = [
  {
    accessorKey: "name",
    header: "Brand",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
