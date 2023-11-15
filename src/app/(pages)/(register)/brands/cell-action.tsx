"use client";

import { useState } from "react";

import { Button } from "@/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { AlertModal } from "@/client/components/alert-modal";

import { BrandsColumn } from "./columns";
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { BrandActions } from "@/client/actions/brand-actions";
import { useOnResponseStatus } from "@/client/hooks/use-on-response-status";
import { useDeleteMutate, useMutate } from "@/client/hooks/useMutation";

interface CellActionProps {
  data: BrandsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { onError, onSuccess } = useOnResponseStatus();
  const [open, setOpen] = useState(false);

  const { mutate: RemoveBrandMutation, isLoading } = useDeleteMutate({
    queryKey: ["brands"],
    mutationFn: BrandActions.remove,
    onSuccess: () => {
      onSuccess("Brand Removed");
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });

  const onDeleteConfirm = async () => {
    try {
      await RemoveBrandMutation(data.id);
    } catch (error: Error | any) {
      onError(error.message);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="flex justify-end">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteConfirm}
        loading={isLoading}
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
            onClick={() => window.location.assign(`/brands/${data.id}`)}
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
