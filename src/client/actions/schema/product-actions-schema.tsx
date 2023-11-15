import schema from "../../lib/schema";
import { BrandSchema } from "./brand-actions-schema";
import { CategorySchema } from "./category-actions-schema";

export const ProductSchema = schema.object({
  id: schema.string(),
  name: schema.string().min(3),
  brandId: schema.string(),
  brand: BrandSchema.optional(),
  categoryId: schema.string(),
  category: CategorySchema.optional(),
  cost: schema.coerce.string(),
  description: schema.string(),
  trending: schema.boolean().default(false),
});

export type Product = schema.infer<typeof ProductSchema>;

export const CreateProductSchema = schema.object({
  name: schema.string().min(3),
  brandId: schema.string(),
  categoryId: schema.string(),
  description: schema.string(),
});

export type CreateProduct = schema.infer<typeof CreateProductSchema>;

export const fetchProductByIdParamsSchema = schema.string();

export type fetchByIdParamsSchema = schema.infer<
  typeof fetchProductByIdParamsSchema
>;

export const removeProductByIdParamsSchema = schema.string();

export type removeProductByIdParams = schema.infer<
  typeof removeProductByIdParamsSchema
>;
