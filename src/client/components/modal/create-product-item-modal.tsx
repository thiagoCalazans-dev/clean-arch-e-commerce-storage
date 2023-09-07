"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { ProductItemForm } from "../forms/product-items-form";
import { Size } from "@/client/schema/actions/size-actions-schema";
import { Color } from "@/client/schema/actions/color-actions-schema";

interface CreateProductItemModalProps {
  productId: string;
  size: Size[];
  color: Color[];
}

export function CreateProductItemModal({
  color,
  productId,
  size,
}: CreateProductItemModalProps) {
  const [modalState, setModalState] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  function onClose() {
    setModalState(false);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button type="button" onClick={() => setModalState(true)}>
        Add Item
      </Button>
      <Modal
        title="Are you sure?"
        description="This action cannot be undone."
        isOpen={modalState}
        onClose={onClose}
      >
        <ProductItemForm color={color} size={size} productId={productId} />
      </Modal>
    </>
  );
}
