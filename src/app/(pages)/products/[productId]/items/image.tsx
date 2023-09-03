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
  console.log(data);

  if (!data.length) {
    return (
      <Card className="flex justify-center items-center h-28 w-full">
        No images
      </Card>
    );
  }

  return data.map((item) => (
    <div
      key={item.id}
      className="relative w-28 h-28 shadow overflow-hidden rounded-xl"
    >
      <Image fill src={item.url} alt="bikini photo" />
    </div>
  ));
}
