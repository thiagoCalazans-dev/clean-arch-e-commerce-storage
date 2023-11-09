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

import { useRouter } from "next/navigation";
import { useOnResponseStatus } from "@/client/hooks/use-on-response-status";
import {
  FormStockEntry,
  FormStockEntrySchema,
} from "@/client/actions/schema/stock-action-schema";
import { StockActions } from "@/client/actions/stock-actions";

interface StockEntryParams {
  productItemId: string;
}

export function StockEntryForm({ productItemId }: StockEntryParams) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<FormStockEntry>({
    resolver: zodResolver(FormStockEntrySchema),
    defaultValues: {
      productItemId: productItemId,
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: FormStockEntry) {
    try {
      StockActions.entry(formValues);
      await StockActions.entry(formValues);
      onSuccess("Entry success");
      form.reset();
      router.prefetch("/stock");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full md:max-w-5xl "
      >
        <FormField
          control={form.control}
          name="productItemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Id</FormLabel>
              <FormControl>
                <Input disabled={true} placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:gap-2 md:grid-cols-2 ">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="number"
                    placeholder="Quantidade"
                    {...field}
                  />
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
                <FormLabel>Valor de aquisição</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isSubmitting}
                    placeholder="€ 00.00"
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
