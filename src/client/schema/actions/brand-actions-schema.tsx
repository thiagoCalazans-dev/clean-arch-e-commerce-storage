import schema from "../../lib/schema";

export const BrandSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
});

export type Brand = schema.infer<typeof BrandSchema>;

export const CreateBrandSchema = schema.object({
  name: schema.string().min(3),
});

export type CreateBrand = schema.infer<typeof CreateBrandSchema>;

export const fetchBrandByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchBrandByIdParamsSchema
>;

export const removeBrandByIdParamsSchema = schema.string();

export type removeBrandByIdParams = schema.infer<
  typeof removeBrandByIdParamsSchema
>;
