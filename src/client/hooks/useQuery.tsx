import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/tanstack-query";

interface useMutateProps {
  action: () => Promise<void>;
  queryKey: String[];
  onSuccess: () => void;
}

export function useMutate({ action, onSuccess, queryKey }: useMutateProps) {
  return useMutation({
    mutationFn: () => {
      return action();
    },
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
}
