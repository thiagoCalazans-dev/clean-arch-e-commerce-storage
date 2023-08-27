import schema from "../../lib/schema";

export const ColorSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
  value: schema.string(),
});

export type Color = schema.infer<typeof ColorSchema>;

export const CreateColorSchema = schema.object({
  name: schema.string().min(3),
  value: schema.string(),
});

export type CreateColor = schema.infer<typeof CreateColorSchema>;

export const fetchColorByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchColorByIdParamsSchema
>;

export const removeColorByIdParamsSchema = schema.string();

export type removeColorByIdParams = schema.infer<
  typeof removeColorByIdParamsSchema
>;
