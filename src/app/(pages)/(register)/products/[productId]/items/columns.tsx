"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ProductsColumn = {
  id: string;
  productId: string;
  code: string;
  color: {
    id: string;
    name: string;
    value: string;
  };
  size: {
    id: string;
    name: string;
    value: string;
  };
  price: number;
  descount: number;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "code",
    header: "Código",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "descount",
    header: "Desconto",
  },
  {
    accessorKey: "color.name",
    header: "Cor",
  },
  {
    accessorKey: "size.name",
    header: "Tamanho",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
