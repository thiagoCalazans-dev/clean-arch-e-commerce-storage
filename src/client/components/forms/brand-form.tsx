"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/client/components/ui/form";
import { FormBrandSchema } from "@/client/components/forms/schema/brand-form-schema";
import { useRouter } from "next/navigation";
import { BrandActions } from "@/client/actions/brand-actions";
import { useOnResponseStatus } from "@/client/hooks/use-on-response-status";
import { Brand } from "@/client/actions/schema/brand-actions-schema";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/client/lib/tanstack-query";

interface BrandFormProps {
  initialData: Brand | null;
}

export function BrandForm({ initialData }: BrandFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<Brand>({
    resolver: zodResolver(FormBrandSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const mutation = useMutation({
    mutationFn: (formValues: Brand) => {
      return BrandActions.create(formValues);
    },
    onSuccess: () => {
      onSuccess("Brand Created");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (formValues: Brand) => {
      return BrandActions.update(formValues);
    },
    onSuccess: () => {
      onSuccess("Brand Created");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });

  async function onSubmit(formValues: Brand) {
    try {
      if (initialData) {
        mutationUpdate.mutate(formValues);
        return;
      }
      mutation.mutate(formValues);
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isSubmitting} className="ml-auto" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
