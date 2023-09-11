"use client";

import { Button } from "@/client/components/ui/button";

import { Modal } from "@/client/components/ui/modal";

import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ImageForm } from "../forms/image-form";
import { useRouter } from "next/navigation";

export function UploadPhotoModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function onCloseModal() {
    router.refresh();
    setOpen(false);
  }

  return (
    <>
      <Button
        className="flex gap-2"
        type="button"
        onClick={() => setOpen(true)}
      >
        Upload Photo
        <UploadIcon />
      </Button>
      <Modal
        title="Upload Photo"
        isOpen={open}
        onClose={onCloseModal}
        description=""
      >
        <ImageForm />
      </Modal>
    </>
  );
}
