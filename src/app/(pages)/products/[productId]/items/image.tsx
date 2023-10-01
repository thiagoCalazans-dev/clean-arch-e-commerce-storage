import { Card } from "@/client/components/ui/card";
import Image from "next/image";

interface productImage {
  id: string;
  productItemId: string;
  imageUrl: string;
}

interface ProductImagesProps {
  data: productImage[];
}

export function ProductImages({ data }: ProductImagesProps) {
  if (!data.length) {
    return (
      <Card className="flex justify-center col-span-3 items-center w-full h-40">
        No images
      </Card>
    );
  }

  console.log(data[0]);

  return data.map((item) => (
    <div
      key={item.id}
      className="relative h-40 w-full  shadow overflow-hidden rounded-xl"
    >
      <Image fill src={item.imageUrl} alt="bikini photo" />
    </div>
  ));
}
