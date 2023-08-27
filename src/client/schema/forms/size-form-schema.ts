import schema from "@/client/lib/schema";

export const FormSizeSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
  value: schema.string(),
});

export type FormSize = schema.infer<typeof FormSizeSchema>;
