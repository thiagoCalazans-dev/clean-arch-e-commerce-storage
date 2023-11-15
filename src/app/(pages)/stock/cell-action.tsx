"use client";
import { Button } from "@/client/components/ui/button";
import { StockColumn } from "./columns";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: StockColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center justify-end ">
      <Button
        variant="destructive"
        type="button"
        onClick={() =>
          router.push(
            `/outgoing/${data.productItem?.productId}/${data.productItemId}`
          )
        }
      >
        <MinusIcon />
      </Button>
      <span className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background shadow-sm  h-9 px-4 py-2">
        {data.quantity}
      </span>
      <Button
        variant="default"
        type="button"
        onClick={() =>
          router.push(
            `/incoming/${data.productItem?.productId}/${data.productItemId}`
          )
        }
      >
        <PlusIcon />
      </Button>
    </div>
  );
};
