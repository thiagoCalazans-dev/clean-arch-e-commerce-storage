import schema from "@/client/lib/schema";

export const FormProductItemSchema = schema.object({
  code: schema.string(),
  sizeId: schema.string(),
  colorId: schema.string(),
  price: schema.coerce.number(),
  descount: schema.coerce.number().min(0).max(100).default(0),
});

export type FormProductItem = schema.infer<typeof FormProductItemSchema>;
