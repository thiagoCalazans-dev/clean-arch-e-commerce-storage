"use client";
import { ProductItemActions } from "@/client/actions/product-items-actions";
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "../alert-modal";
import { Button } from "../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

interface DeleteButtonProps {
  productId: string;
  productItemId: string;
  name: string;
}

export function DeleteProductItemButton({
  name,
  productItemId,
  productId,
}: DeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onSuccess, onError } = useOnResponseStatus();

  const onDeleteConfirm = async () => {
    try {
      setLoading(true);
      await await ProductItemActions.remove({
        productId: productId,
        productItemId: productItemId,
      });
      onSuccess(`${name} deleted!`);
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  function onClose() {
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="">
      <AlertModal
        isOpen={open}
        onClose={onClose}
        onConfirm={() => onDeleteConfirm()}
        loading={loading}
      />

      <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
        <TrashIcon />
      </Button>
    </div>
  );
}
