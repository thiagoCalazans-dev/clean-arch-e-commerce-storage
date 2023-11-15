import schema from "@/client/lib/schema";

export const FormProductSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string(),
  brandId: schema.string(),
  categoryId: schema.string(),
  description: schema.string(),
});

export type FormProduct = schema.infer<typeof FormProductSchema>;
