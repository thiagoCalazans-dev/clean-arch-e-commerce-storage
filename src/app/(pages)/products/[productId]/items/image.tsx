import { Card } from "@/client/components/ui/card";
import Image from "next/image";

interface productImage {
  id: string;
  url: string;
}

interface ProductImagesProps {
  data: productImage[];
}

export function ProductImages({ data }: ProductImagesProps) {
  if (!data.length) {
    return (
      <Card className="flex justify-center items-center w-full h-24 lg:h-full">
        No images
      </Card>
    );
  }

  return data.map((item) => (
    <div
      key={item.id}
      className="relative w-full h-full shadow overflow-hidden rounded-xl"
    >
      <Image fill src={item.url} alt="bikini photo" />
    </div>
  ));
}
