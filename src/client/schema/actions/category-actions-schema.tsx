import schema from "../../lib/schema";

export const CategorySchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
});

export type Category = schema.infer<typeof CategorySchema>;

export const CreateCategorySchema = schema.object({
  name: schema.string().min(3),
});

export type CreateCategory = schema.infer<typeof CreateCategorySchema>;

export const fetchCategoryByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchCategoryByIdParamsSchema
>;

export const removeCategoryByIdParamsSchema = schema.string();

export type removeCategoryByIdParams = schema.infer<
  typeof removeCategoryByIdParamsSchema
>;
