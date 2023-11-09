import { Brand } from "@/client/actions/schema/brand-actions-schema";
import { useOnResponseStatus } from "../use-on-response-status";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/client/lib/tanstack-query";
import { BrandActions } from "@/client/actions/brand-actions";

export function useBrandMutationPost() {
  const { onSuccess, onError } = useOnResponseStatus();
  const { mutate } = useMutation({
    mutationFn: (formValues: Brand) => {
      const action = BrandActions.create(formValues);
      return action;
    },
    onSuccess: () => {
      onSuccess("Brand Created");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });
  return mutate;
}
