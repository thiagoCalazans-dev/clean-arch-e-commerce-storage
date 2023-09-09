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

import { ColorsColumn } from "./columns";
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ColorActions } from "@/client/actions/color-actions";
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";

interface CellActionProps {
  data: ColorsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      await ColorActions.remove(data.id);
      onSuccess("Color deleted");
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => window.location.assign(`/colors/${data.id}`)}
          >
            <Pencil2Icon className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setOpen(true)}
          >
            <TrashIcon className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};