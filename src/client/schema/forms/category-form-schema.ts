import schema from "@/client/lib/schema";

export const FormCategorySchema = schema.object({
  id: schema.string().optional(),
  name: schema.string().min(3),
});

export type Category = {
  id: string;
  name: string;
};

export type FormCategory = schema.infer<typeof FormCategorySchema>;
