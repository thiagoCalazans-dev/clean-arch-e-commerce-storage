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
import { ProductActions } from "@/client/actions/product-actions";
import { useOnResponseStatus } from "@/client/hooks/use-on-response-status";
import { Product } from "@/client/actions/schema/product-actions-schema";
import { FormProductSchema } from "@/client/components/forms/schema/product-form-schema";
import { Textarea } from "../ui/text-area";

import { Combobox } from "../ui/combobox";
import { Brand } from "@/client/actions/schema/brand-actions-schema";
import { Category } from "@/client/actions/schema/category-actions-schema";
import { Checkbox } from "../ui/checkbox";

interface ProductFormProps {
  initialData: Product | null;
  brand: Brand[];
  category: Category[];
}

export function ProductForm({
  initialData,
  brand,
  category,
}: ProductFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<Product>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: initialData || {
      name: "",
      brandId: "",
      categoryId: "",
      description: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  console.log(errors);

  async function onSubmit(formValues: Product) {
    try {
      if (initialData) {
        await ProductActions.update(formValues);
        onSuccess("Product Updated");
        await router.prefetch("/products");
        return;
      }
      await ProductActions.create(formValues);
      onSuccess("Product Created");
      form.reset();
      router.prefetch("/products");
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
        <div className="grid md:gap-2 md:grid-cols-2 ">
          <Combobox data={brand} form={form} label="Brand" name="brandId" />
          <Combobox
            data={category}
            form={form}
            label="Category"
            name="categoryId"
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="Type"
                  {...field}
                />
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
