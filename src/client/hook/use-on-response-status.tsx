"use client";
import { useToast } from "./use-toast";

export function useOnResponseStatus() {
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
