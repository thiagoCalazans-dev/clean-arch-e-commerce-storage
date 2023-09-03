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
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";
import { Product } from "@/client/schema/actions/product-actions-schema";
import { Textarea } from "../ui/text-area";

import { Combobox } from "../ui/combobox";
import { Brand } from "@/client/schema/actions/brand-actions-schema";
import { Category } from "@/client/schema/actions/category-actions-schema";
import { Checkbox } from "../ui/checkbox";
import {
  FormProductItem,
  FormProductItemSchema,
} from "@/client/schema/forms/prodct-item-form";
import { ProductItem } from "@/client/schema/actions/product-item-actions-schema";
import { Color } from "@/client/schema/actions/color-actions-schema";
import { Size } from "@/client/schema/actions/size-actions-schema";
import { ProductItemActions } from "@/client/actions/product-items-actions";

interface ProductFormProps {
  productId: string;
  size: Size[];
  color: Color[];
}

export function ProductForm({ productId, size, color }: ProductFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<ProductItem>({
    resolver: zodResolver(FormProductItemSchema),
    defaultValues: {
      colorId: "",
      sizeId: "",
      price: "",
      descount: 0,
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: FormProductItem) {
    try {
      await ProductItemActions.create(formValues);
      const product = {
        ...formValues,
        productId: productId,
      };
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
          name="price"
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
          name="descount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:gap-2 md:grid-cols-2 ">
          <Combobox data={color} form={form} label="Color" name="colorId" />
          <Combobox data={size} form={form} label="Size" name="sizeId" />
        </div>
        <Button disabled={isSubmitting} className="ml-auto" type="submit">
          Save changes
        </Button>
      </form>
    </Form>
  );
}
