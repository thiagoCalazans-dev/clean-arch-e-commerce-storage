"use client";
import { Button } from "@/client/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

function onCopy(text: string) {
  navigator.clipboard.writeText(text);
}

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  return (
    <Button variant="outline" type="button" onClick={() => onCopy(text)}>
      <ClipboardCopyIcon />
    </Button>
  );
}
