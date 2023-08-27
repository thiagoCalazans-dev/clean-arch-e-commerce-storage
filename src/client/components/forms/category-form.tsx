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
import { FormCategorySchema } from "@/client/schema/forms/category-form-schema";
import { useRouter } from "next/navigation";
import { CategoryActions } from "@/client/actions/category-actions";
import { useOnResponseStatus } from "@/client/hook/use-on-response-status";
import { Category } from "@/client/schema/actions/category-actions-schema";

interface CategoryFormProps {
  initialData: Category | null;
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const { onError, onSuccess } = useOnResponseStatus();
  const router = useRouter();

  const form = useForm<Category>({
    resolver: zodResolver(FormCategorySchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: Category) {
    try {
      if (initialData) {
        await CategoryActions.update(formValues);
        onSuccess("Category Updated");
        await router.prefetch("/categories");
        return;
      }
      await CategoryActions.create(formValues);
      onSuccess("Category Created");
      form.reset();
      router.prefetch("/categories");
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
