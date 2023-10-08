"use client";

import { Card } from "@/client/components/ui/card";
import { Heading } from "@/client/components/ui/heading";

import { Separator } from "@/client/components/ui/separator";
import { UploadPhotoModal } from "../../../client/components/modal/upload-photo-modal";

import { ImageAction } from "@/client/actions/image.actions";
import { useQuery } from "@tanstack/react-query";
import { Gallery } from "./galery";

export default function GaleryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: ImageAction.getAll,
  });

  console.log(data);

  return (
    <section className="flex flex-col px-8">
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Galery" description="Manage your images" />
          <UploadPhotoModal />
        </div>
        <Separator />
      </div>
      {isLoading ? (
        <Card className="flex w-full justify-center items-center h-96">
          Loading
        </Card>
      ) : (
        <Gallery data={data.data} />
      )}
    </section>
  );
}
