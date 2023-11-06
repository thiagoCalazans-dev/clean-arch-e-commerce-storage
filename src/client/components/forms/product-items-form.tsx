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
import { Product } from "@/client/actions/schema/product-actions-schema";
import { Textarea } from "../ui/text-area";

import { Combobox } from "../ui/combobox";
import { Brand } from "@/client/actions/schema/brand-actions-schema";
import { Category } from "@/client/actions/schema/category-actions-schema";
import { Checkbox } from "../ui/checkbox";
import {
  FormProductItem,
  FormProductItemSchema,
} from "@/client/components/forms/schema/product-item-form";
import { ProductItem } from "@/client/actions/schema/product-item-actions-schema";
import { Color } from "@/client/actions/schema/color-actions-schema";
import { Size } from "@/client/actions/schema/size-actions-schema";
import { ProductItemActions } from "@/client/actions/product-items-actions";

interface ProductItemFormProps {
  productId: string;
  size: Size[];
  color: Color[];
}

export function ProductItemForm({
  productId,
  size,
  color,
}: ProductItemFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<ProductItem>({
    resolver: zodResolver(FormProductItemSchema),
    defaultValues: {
      colorId: "",
      sizeId: "",
      price: 0,
      descount: 0,
      code: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: FormProductItem) {
    try {
      const product = {
        ...formValues,
        productId: productId,
      };

      await ProductItemActions.create(product, productId);

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
          name="code"
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="Type"
                  type="number"
                  {...field}
                />
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
              <FormLabel>Descount</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder=""
                  type="number"
                  {...field}
                />
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
