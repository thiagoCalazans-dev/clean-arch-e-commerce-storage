import schema from "@/client/lib/schema";

export const FormColorSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
  value: schema.string(),
});

export type FormColor = schema.infer<typeof FormColorSchema>;
