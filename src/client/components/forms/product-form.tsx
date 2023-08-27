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
import { FormProductSchema } from "@/client/schema/forms/product-form-schema";
import { Textarea } from "../ui/text-area";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/commander";
import { cn } from "@/client/lib/utils";

interface ProductFormProps {
  initialData: Product | null;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<Product>({
    resolver: zodResolver(FormProductSchema),
    defaultValues: initialData || {
      name: "",
      brandId: "",
      categoryId: "",
      code: "",
      cost: "",
      description: "",
      trending: false,
    },
  });

  const brands = [
    { name: "English", id: "en" },
    { name: "French", id: "fr" },
    { name: "German", id: "de" },
    { name: "Spanish", id: "es" },
    { name: "Portuguese", id: "pt" },
    { name: "Russian", id: "ru" },
    { name: "Japanese", id: "ja" },
    { name: "Korean", id: "ko" },
    { name: "Chinese", id: "zh" },
  ] as const;

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: Product) {
    try {
      if (initialData) {
        await ProductActions.update(formValues);
        onSuccess("Product Updated");
        await router.prefetch("/products");
        return;
      }
      await console.log(formValues);
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
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? brands.find((brand) => brand.id === field.value)?.name
                        : "Select brand"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No brands found.</CommandEmpty>
                    <CommandGroup>
                      {brands.map((brand) => (
                        <CommandItem
                          value={brand.name}
                          key={brand.id}
                          onSelect={() => {
                            form.setValue("brandId", brand.id);
                          }}
                        >
                          {brand.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              brand.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
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
