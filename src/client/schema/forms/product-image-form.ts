import schema from "@/client/lib/schema";

export const FormProductImageSchema = schema.object({
  image_url: schema.string(),
});

export type FormProductImage = schema.infer<typeof FormProductImageSchema>;
