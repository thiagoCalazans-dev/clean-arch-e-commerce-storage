"use client";

import { ImageAction } from "@/client/actions/image.actions";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Modal } from "@/client/components/ui/modal";
import { supabase } from "@/client/lib/supabse";
import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { ImageForm } from "../forms/image-form";

export function UploadPhotoModal() {
  const [open, setOpen] = useState(false);

 

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
        onClose={() => setOpen(false)}
        description=""
      >
        <ImageForm />
        {/* <form className="grid w-full  items-center gap-1.5">
          <Input id="picture" type="file" onChange={(e) => onChange(e)} />
          <Button type="button" onClick={onSubmitPhotoClick}>
            Submit
          </Button>
        </form> */}
      </Modal>
    </>
  );
}
