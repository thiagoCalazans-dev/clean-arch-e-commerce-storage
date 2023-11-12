import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/tanstack-query";

interface useMutateProps {
  queryKey: any[];
  mutationFn: (props?: any) => Promise<void | any>;
  onSuccess: () => any;
  onError: (error: Error) => any;
}

export function useMutate({
  queryKey,
  mutationFn,
  onSuccess,
  onError,
}: useMutateProps) {
  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
        queryClient.invalidateQueries({ queryKey: queryKey });
      }
    },
    onError: (error: Error) => {
      if (onError) {
        return onError(error);
      }
    },
  });
}
