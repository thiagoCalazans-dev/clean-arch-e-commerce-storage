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
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";
import Image from "next/image";

import {
  FormProductImage,
  FormProductImageSchema,
} from "@/client/schema/forms/product-image-form";
import { ProductImageActions } from "@/client/actions/product-image-actions";

interface ProductImageFormProps {
  productId: string;
  productItemId: string;
}

export function ProductImageForm({
  productId,
  productItemId,
}: ProductImageFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<FormProductImage>({
    resolver: zodResolver(FormProductImageSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  const imageUrl = form.watch("imageUrl");

  async function onSubmit(formValues: FormProductImage) {
    try {
      const productImage = {
        ...formValues,
        productItemId: productItemId,
      };

      console.log(productImage, productId);
      await ProductImageActions.create(productImage, productId);

      onSuccess("Product Created");
      form.reset();
      router.prefetch("/products");
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
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
          <Button disabled={isSubmitting} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}
