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
import { useMutate } from "@/client/hooks/useMutation";

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

  const { mutate: CreateBrandMutation } = useMutate({
    queryKey: ["brands"],
    mutationFn: BrandActions.create,
    onSuccess: () => {
      onSuccess("Brand Created"), form.reset;
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });

  const { mutate: UpdateBrandMutation } = useMutate({
    queryKey: ["brands"],
    mutationFn: BrandActions.create,
    onSuccess: () => {
      onSuccess("Brand Updated");
    },
    onError: (error: Error) => {
      onError(error.message);
    },
  });

  async function onSubmit(formValues: Brand) {
    try {
      if (initialData) {
        UpdateBrandMutation(formValues);
        return;
      }
      CreateBrandMutation(formValues);
    } catch (error: Error | any) {
      onError(error.message);
    } finally {
      form.reset();
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
