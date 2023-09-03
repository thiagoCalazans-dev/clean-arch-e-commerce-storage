"use client";

import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { Modal } from "@/client/components/ui/modal";
import { supabase } from "@/client/lib/supabse";
import { UploadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function UploadPhotoModal() {
  let name: string;
  let file: string;
  let format: string;

  const [open, setOpen] = useState(false);

  async function onChange(event: any) {
    file = event.target.files[0];
    const fileName = event.target.files[0].name;
    name = fileName.split(".")[0];
    format = fileName.split(".")[1];
  }

  async function onSubmitPhotoClick() {
    const { data, error } = await supabase.storage
      .from("Delmar Photos")
      .upload(`${name}.${format}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
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
        onClose={() => setOpen(false)}
        description=""
      >
        <div className="grid w-full  items-center gap-1.5">
          <Input id="picture" type="file" onChange={(e) => onChange(e)} />
          <Button type="button" onClick={onSubmitPhotoClick}>
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
}
