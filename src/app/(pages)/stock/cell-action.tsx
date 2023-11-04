"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { AlertModal } from "@/client/components/alert-modal";

import { StockColumn } from "./columns";
import {
  DotsHorizontalIcon,
  MinusIcon,
  Pencil2Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { BrandActions } from "@/client/actions/brand-actions";
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/client/lib/tanstack-query";

interface CellActionProps {
  data: StockColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex  gap-4">
      <Button variant="destructive">
        <MinusIcon />
      </Button>
      <Button>
        <PlusIcon />
      </Button>
    </div>
  );
};
