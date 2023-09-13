"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/client/components/ui/modal";
import { Button } from "@/client/components/ui/button";
import { ProductImageForm } from "../forms/product-image-form";
import { ImageIcon } from "@radix-ui/react-icons";

interface CreateProductImageModalProps {
  productId: string;
  productItemId: string;
}

export function CreateProductImageModal({
  productItemId,
  productId,
}: CreateProductImageModalProps) {
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
        <ImageIcon className="mr-2 h-4 w-4" /> image
      </Button>
      <Modal
        title="Product image"
        description="create a new item."
        isOpen={modalState}
        onClose={closeModal}
      >
        <ProductImageForm productId={productId} productItemId={productItemId} />
      </Modal>
    </>
  );
}
