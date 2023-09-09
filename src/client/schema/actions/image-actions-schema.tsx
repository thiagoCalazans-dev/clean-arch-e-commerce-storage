import schema from "../../lib/schema";
import { FormImageSchema, InputFileSchema } from "../forms/image-form-schema";

export const ImageSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
  url: schema.string(),
});

export type Image = schema.infer<typeof ImageSchema>;

export const CreateImageParamsSchema = schema.object({
  FormImageSchema,
  InputFileSchema,
});

export type CreateImage = schema.infer<typeof CreateImageParamsSchema>;

export const fetchColorByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchColorByIdParamsSchema
>;

export const removeColorByIdParamsSchema = schema.string();

export type removeColorByIdParams = schema.infer<
  typeof removeColorByIdParamsSchema
>;
