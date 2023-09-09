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
import {
  FormImage,
  FormImageSchema,
} from "@/client/schema/forms/image-form-schema";
import { ImageAction } from "@/client/actions/image.actions";
import { useState } from "react";

export function ImageForm() {
  const { onError, onSuccess } = useOnResponseStatus();
  const [inputFile, setInputFile] = useState({
    name: "",
    file: "",
    format: "",
  });
  const router = useRouter();

  async function onFileInputChange(event: any) {
    const formFileName = event.target.files[0].name;
    setInputFile({
      file: event.target.files[0],
      name: formFileName.split(".")[0],
      format: formFileName.split(".")[1],
    });
  }

  const form = useForm<FormImage>({
    resolver: zodResolver(FormImageSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, errors } = form.formState;

  async function onSubmit(formValues: FormImage) {
    try {
      await ImageAction.create(formValues, inputFile);
      //   onSuccess("Color Created");
      //   form.reset();
      //   router.prefetch("/colors");
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
        <FormItem>
          <FormLabel>Image file</FormLabel>
          <FormControl>
            <Input
              disabled={isSubmitting}
              type="file"
              onChange={onFileInputChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
        <Button
          disabled={isSubmitting}
          className="ml-auto w-full"
          type="submit"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
}
