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
import { FormColorSchema } from "@/client/schema/forms/color-form-schema";
import { useRouter } from "next/navigation";
import { ColorActions } from "@/client/actions/color-actions";
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";
import { Color } from "@/client/schema/actions/color-actions-schema";

interface ColorFormProps {
  initialData: Color | null;
}

export function ColorForm({ initialData }: ColorFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<Color>({
    resolver: zodResolver(FormColorSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: Color) {
    try {
      if (initialData) {
        await ColorActions.update(formValues);
        onSuccess("Color Updated");
        await router.prefetch("/colors");
        return;
      }
      await ColorActions.create(formValues);
      onSuccess("Color Created");
      form.reset();
      router.prefetch("/colors");
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
              <FormLabel>Hexadecimal value</FormLabel>
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
