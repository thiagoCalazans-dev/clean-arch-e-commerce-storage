import schema from "@/client/lib/schema";

export const FormImageSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
});

export type FormImage = schema.infer<typeof FormImageSchema>;

export const InputFileSchema = schema.object({
  name: schema.string().min(3),
  format: schema.string().min(3),
  file: schema.string().min(3),
});

export type InputFile = schema.infer<typeof InputFileSchema>;
