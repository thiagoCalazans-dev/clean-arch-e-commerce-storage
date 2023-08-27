import schema from "@/client/lib/schema";

export const FormBrandSchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
});

export type FormBrand = schema.infer<typeof FormBrandSchema>;
