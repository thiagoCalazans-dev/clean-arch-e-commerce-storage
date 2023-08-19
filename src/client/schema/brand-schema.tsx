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

export const fetchBrandByIdParamsSchema = schema.string().uuid();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchBrandByIdReponseSchema
>;
export type fetchBrandByIdReponse = schema.infer<
  typeof fetchBrandByIdParamsSchema
>;
