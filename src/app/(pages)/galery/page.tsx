import { supabase } from "@/client/lib/supabse";

import { Card } from "@/client/components/ui/card";

import { Input } from "@/client/components/ui/input";
import { Heading } from "@/client/components/ui/heading";

import { Separator } from "@/client/components/ui/separator";
import { UploadPhotoModal } from "./upload-photo-modal";
import { ClientGallery } from "./clientGallery";

export default async function GaleryPage() {
  const { data: images, error } = await supabase.storage
    .from("Delmar Photos")
    .list();

  if (error) {
    console.error("Erro ao listar objetos no armazenamento:", error.message);
    return;
  }

  const data = images.map((object) => {
    const fileName = object.name;
    const publicUrl = supabase.storage
      .from("Delmar Photos")
      .getPublicUrl(fileName);
    return {
      id: object.id,
      name: object.name,
      url: publicUrl.data.publicUrl,
    };
  });

  if (!data.length) {
    return (
      <Card className="flex justify-center items-center h-28 w-full">
        No images
      </Card>
    );
  }

  return (
    <section className="flex flex-col px-8">
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Galery items (${data.length})`}
            description="Manage your products items"
          />
          <UploadPhotoModal />
        </div>
        <Separator />
      </div>
      <ClientGallery data={data} />
    </section>
  );
}
