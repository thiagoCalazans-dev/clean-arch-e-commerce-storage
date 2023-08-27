import schema from "../../lib/schema";

export const SizeSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
  value: schema.string(),
});

export type Size = schema.infer<typeof SizeSchema>;

export const CreateSizeSchema = schema.object({
  name: schema.string().min(3),
  value: schema.string(),
});

export type CreateSize = schema.infer<typeof CreateSizeSchema>;

export const fetchSizeByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchSizeByIdParamsSchema
>;

export const removeSizeByIdParamsSchema = schema.string();

export type removeSizeByIdParams = schema.infer<
  typeof removeSizeByIdParamsSchema
>;
