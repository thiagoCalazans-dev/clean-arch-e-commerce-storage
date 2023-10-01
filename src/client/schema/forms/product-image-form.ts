import schema from "@/client/lib/schema";

export const FormProductImageSchema = schema.object({
  imageUrl: schema.string(),
});

export type FormProductImage = schema.infer<typeof FormProductImageSchema>;
