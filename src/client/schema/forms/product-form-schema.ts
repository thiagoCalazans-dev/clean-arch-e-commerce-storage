import schema from "@/client/lib/schema";

export const FormProductSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string(),
  brandId: schema.string(),
  categoryId: schema.string(),
  code: schema.string(),
  cost: schema.string(),
  description: schema.string(),
  trending: schema.boolean().default(false),
});

export type FormProduct = schema.infer<typeof FormProductSchema>;
