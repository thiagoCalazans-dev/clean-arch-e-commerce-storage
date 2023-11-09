"use client";
import { ImageAction } from "@/client/actions/image.actions";
import { AlertModal } from "@/client/components/alert-modal";
import { Button } from "@/client/components/ui/button";
import { Card } from "@/client/components/ui/card";
import { CopyButton } from "@/client/components/ui/copy-button";
import { Input } from "@/client/components/ui/input";
import { ToolTip } from "@/client/components/ui/tooltip";
import { useOnResponseStatus } from "@/client/hooks/use-on-response-status";
import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ClientGallertProps {
  data: {
    id: string;
    name: string;
    url: string;
  }[];
}

export function Gallery({ data }: ClientGallertProps) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();
  const [id, setId] = useState("");

  function onChange(event: any) {
    const query = event.target.value;
    setInputValue(query);
  }

  const filteredImagesByInputValue = data.filter((item) =>
    item.name.toLocaleLowerCase().toLowerCase().includes(inputValue)
  );

  async function onCloseModal() {
    await router.refresh();
    setOpen(false);
  }

  function onOpenModal(id: string) {
    setOpen(true);
    setId(id);
  }

  async function onDeleteConfirm() {
    try {
      setLoading(true);
      await ImageAction.remove(id);
      onSuccess("Image deleted");
      router.refresh();
    } catch (error: Error | any) {
      onError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={onCloseModal}
        onConfirm={onDeleteConfirm}
        loading={loading}
      />
      <div className="flex gap-2 w-full items-center relative">
        <Input
          className="w-full "
          onChange={onChange}
          placeholder="search photo..."
        />

        <MagnifyingGlassIcon className="absolute right-5" />
      </div>

      <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4  py-4">
        {filteredImagesByInputValue.map((item) => (
          <>
            <Card className="p-2" key={item.id}>
              <div className="relative w-full h-96  aspect-auto  overflow-hidden rounded-xl">
                <Image fill src={item.url} alt={item.name} />
              </div>
              <div className="flex w-full justify-between items-center p-2">
                <span>{item.name}</span>
                <div className="flex gap-4">
                  <ToolTip text="Copy Image URL">
                    <div>
                      <CopyButton text={item.url} />
                    </div>
                  </ToolTip>
                  <Button
                    type="button"
                    onClick={() => onOpenModal(item.id)}
                    variant="destructive"
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
