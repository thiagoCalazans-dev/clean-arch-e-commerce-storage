"use client";
import { useToast } from "../components/ui/use-toast";

export function ToastHook() {
  const { toast } = useToast();

  function onSuccess(title: string) {
    toast({
      title,
      description: new Date().toDateString(),
    });
  }

  function onError(message: string) {
    toast({
      title: "Error",
      description: message,
    });
  }

  return {
    onSuccess,
    onError,
  };
}
