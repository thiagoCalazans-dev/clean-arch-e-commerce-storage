"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { ProductItemForm } from "../forms/product-items-form";
import { Size } from "@/client/actions/schema/size-actions-schema";
import { Color } from "@/client/actions/schema/color-actions-schema";

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

  function closeModal() {
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
        title="Product items"
        description="create a new item."
        isOpen={modalState}
        onClose={closeModal}
      >
        <ProductItemForm color={color} size={size} productId={productId} />
      </Modal>
    </>
  );
}
