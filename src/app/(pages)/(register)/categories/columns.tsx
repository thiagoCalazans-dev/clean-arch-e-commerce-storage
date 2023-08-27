"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CategoriesColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
