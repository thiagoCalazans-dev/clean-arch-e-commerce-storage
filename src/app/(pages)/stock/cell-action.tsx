"use client";
import { Button } from "@/client/components/ui/button";
import { StockColumn } from "./columns";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: StockColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() =>
        router.push(
          `/incoming/${data.productItem?.productId}/${data.productItemId}`
        )
      }
    >
      <EnterIcon />
    </Button>
  );
};
