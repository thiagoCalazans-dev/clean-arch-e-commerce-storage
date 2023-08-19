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
import { Brand, BrandSchema } from "@/client/schema/brand-schema";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface BrandFormProps {
  initialData: Brand | null;
}

export function BrandForm({ initialData }: BrandFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<Brand>({
    resolver: zodResolver(BrandSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(formValues: Brand) {
    try {
      if (initialData) {
        const update = await console.log("update", formValues);
        toast({
          title: "Brand Updated",
          description: new Date().toDateString(),
        });
        await router.prefetch("/brands");
        return;
      }
      const create = await console.log("create", formValues);
      toast({
        title: "Bidding Type Created",
        description: new Date().toDateString(),
      });
      form.reset();
      router.prefetch("/brands");
    } catch (error) {
      console.log(error);
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
