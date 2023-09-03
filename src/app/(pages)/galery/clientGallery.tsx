"use client";
import { Button } from "@/client/components/ui/button";
import { Card } from "@/client/components/ui/card";
import { CopyButton } from "@/client/components/ui/copy-button";
import { Input } from "@/client/components/ui/input";
import { ToolTip } from "@/client/components/ui/tooltip";
import { supabase } from "@/client/lib/supabse";
import { Item } from "@radix-ui/react-dropdown-menu";
import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useState } from "react";

interface ClientGallertProps {
  data: {
    id: string;
    name: string;
    url: string;
  }[];
}

export function ClientGallery({ data }: ClientGallertProps) {
  const [inputValue, setInputValue] = useState("");

  function onChange(event: any) {
    const query = event.target.value;
    setInputValue(query);
  }

  const filteredData = data.filter((item) =>
    item.name.toLocaleLowerCase().toLowerCase().includes(inputValue)
  );

  async function onDelete(fileName: string) {
    const { data, error } = await supabase.storage
      .from("Delmar Photos")
      .remove([fileName]);
  }

  return (
    <>
      <div className="flex gap-2 w-full items-center relative">
        <Input
          className="w-full "
          onChange={onChange}
          placeholder="search photo..."
        />

        <MagnifyingGlassIcon className="absolute right-5" />
      </div>

      <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4  py-4">
        {filteredData.map((item) => (
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
                  onClick={() => onDelete(item.name)}
                  variant="destructive"
                >
                  <TrashIcon />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
