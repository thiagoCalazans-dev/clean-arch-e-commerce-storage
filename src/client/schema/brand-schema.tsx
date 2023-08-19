import schema from "../lib/schema";

export const BrandSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
  updatedAt: schema.string(),
  createdAt: schema.string(),
});

export type Brand = schema.infer<typeof BrandSchema>;

export const fetchBrandByIdReponseSchema = schema
  .object({
    data: schema.object({
      id: schema.string().uuid(),
      name: schema.string(),
      updatedAt: schema.string(),
      createdAt: schema.string(),
    }),
  })
  .nullable();

export type fetchBrandByIdReponse = schema.infer<
  typeof fetchBrandByIdReponseSchema
>;

export const fetchBrandByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchBrandByIdParamsSchema
>;
export const removeBrandByIdParamsSchema = schema.object({
  brandId: schema.string(),
  onError: schema.function().args(schema.string()).returns(schema.void()),
});

export type removeBrandByIdParams = schema.infer<
  typeof removeBrandByIdParamsSchema
>;
