import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/tanstack-query";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
        queryClient.invalidateQueries({ queryKey: queryKey });
        window.location.reload();
      }
    },
    onError: (error: Error) => {
      if (onError) {
        return onError(error);
      }
    },
  });
}

export function useDeleteMutate({
  queryKey,
  mutationFn,
  onSuccess,
  onError,
}: useMutateProps) {
  return useMutation({
    mutationFn: mutationFn,
    // onMutate: async (dataId: string) => {
    //   // Stop the queries that may affect this operation
    //   await queryClient.cancelQueries(queryKey);

    //   // Get a snapshot of current data
    //   const snapshotOfPreviousData = await queryClient.getQueryData(queryKey);
    //   console.log(queryKey);
    //   console.log(snapshotOfPreviousData);

    //   // Modify cache to reflect this optimistic update
    //   queryClient.setQueryData(queryKey, (oldData: any) =>
    //     oldData.filter((item: any) => item.id !== dataId)
    //   );

    //   // Return a snapshot so we can rollback in case of failure
    //   return {
    //     snapshotOfPreviousData,
    //   };
    // },

    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
        queryClient.invalidateQueries({ queryKey: queryKey });
        window.location.reload();
      }
    },
    onError: (error: Error) => {
      if (onError) {
        return onError(error);
      }
    },
  });
}
