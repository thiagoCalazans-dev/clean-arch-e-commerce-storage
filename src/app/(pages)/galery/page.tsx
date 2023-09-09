import { supabase } from "@/client/lib/supabse";

import { Card } from "@/client/components/ui/card";

import { Input } from "@/client/components/ui/input";
import { Heading } from "@/client/components/ui/heading";

import { Separator } from "@/client/components/ui/separator";
import { UploadPhotoModal } from "../../../client/components/modal/upload-photo-modal";
import { ClientGallery } from "./clientGallery";
import { ImageAction } from "@/client/actions/image.actions";

export default async function GaleryPage() {
  const { data } = await ImageAction.getAll();

  if (!data.length) {
    return (
      <section className="flex flex-col justify-center items-center h-full p-8">
        <Card className="flex w-full justify-center items-center h-96">
          No images
        </Card>
      </section>
    );
  }

  return (
    <section className="flex flex-col px-8">
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Galery (${data.length})`}
            description="Manage your images"
          />
          <UploadPhotoModal />
        </div>
        <Separator />
      </div>
      <ClientGallery data={data} />
    </section>
  );
}
