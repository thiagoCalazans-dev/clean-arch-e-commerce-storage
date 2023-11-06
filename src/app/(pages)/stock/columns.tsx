"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Product } from "@/client/actions/schema/product-actions-schema";
import { Color } from "@/client/actions/schema/color-actions-schema";
import { Size } from "@/client/actions/schema/size-actions-schema";

export type StockColumn = {
  id: string;
  productItemId: string;
  quantity: number;
  productItem?: {
    id: string;
    productId: string;
    product?: Product;
    code: string;
    colorId: string;
    color?: Color;
    sizeId: string;
    size?: Size;
    price: number;
    descount: number;
  };
};

export const columns: ColumnDef<StockColumn>[] = [
  {
    accessorKey: "productItem.code",
    header: "Código",
  },
  {
    accessorKey: "productItem.product.name",
    header: "Nome",
  },
  {
    accessorKey: "productItem.product.brand.name",
    header: "Marca",
  },
  {
    accessorKey: "productItem.product.category.name",
    header: "Categoria",
  },
  {
    accessorKey: "productItem.color.name",
    header: "Cor",
  },
  {
    accessorKey: "productItem.size.name",
    header: "Tamanho",
  },
  {
    accessorKey: "productItem.price",
    header: "Preço",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    id: "actions",
    header: "Movimento",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
