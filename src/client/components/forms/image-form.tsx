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
} from "@/client/components/forms/schema/image-form-schema";
import { ImageAction } from "@/client/actions/image.actions";
import { useState } from "react";

export function ImageForm() {
  const { onError, onSuccess } = useOnResponseStatus();
  const [inputFile, setInputFile] = useState({
    name: "",
    file: "",
  });
  const router = useRouter();

  async function onFileInputChange(event: any) {
    const fileName = event.target.files[0].name;
    setInputFile({
      file: event.target.files[0],
      name: fileName,
    });
  }

  const form = useForm();

  const { isSubmitting, errors } = form.formState;

  async function onSubmit() {
    try {
      await ImageAction.create(inputFile);
      onSuccess("Image Created");
      form.reset();
      router.prefetch("/images");
      setInputFile({
        name: "",
        file: "",
      });
    } catch (error: Error | any) {
      onError(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
