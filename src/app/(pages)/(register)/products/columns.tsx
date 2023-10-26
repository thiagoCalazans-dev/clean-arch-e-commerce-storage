"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductsColumn = {
  id: string;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  cost: string;
  trending: boolean;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
