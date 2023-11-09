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
import { FormSizeSchema } from "@/client/components/forms/schema/size-form-schema";
import { useRouter } from "next/navigation";
import { SizeActions } from "@/client/actions/size-actions";
import { useOnResponseStatus } from "@/client/hooks/use-on-response-status";
import { Size } from "@/client/actions/schema/size-actions-schema";

interface SizeFormProps {
  initialData: Size | null;
}

export function SizeForm({ initialData }: SizeFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<Size>({
    resolver: zodResolver(FormSizeSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: Size) {
    try {
      if (initialData) {
        await SizeActions.update(formValues);
        onSuccess("Size Updated");
        await router.prefetch("/sizes");
        return;
      }
      await SizeActions.create(formValues);
      onSuccess("Size Created");
      form.reset();
      router.prefetch("/sizes");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} className="ml-auto" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
