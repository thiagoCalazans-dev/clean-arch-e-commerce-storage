import schema from "../../lib/schema";
import { BrandSchema } from "./brand-actions-schema";
import { CategorySchema } from "./category-actions-schema";

export const ProductItemSchema = schema.object({
  id: schema.string(),
  productId: schema.string(),
  sizeId: schema.string(),
  colorId: schema.string(),
  price: schema.coerce.string(),
  descount: schema.number().min(0).max(100).default(0),
});

export type ProductItem = schema.infer<typeof ProductItemSchema>;

export const CreateProductItemSchema = schema.object({
  productId: schema.string(),
  sizeId: schema.string(),
  colorId: schema.string(),
  price: schema.coerce.string(),
  descount: schema.number().min(0).max(100).default(0),
});

export type CreateProductItem = schema.infer<typeof CreateProductItemSchema>;

export const fetchProductItemByIdParamsSchema = schema.string();

export type fetchProductItemByIdParams = schema.infer<
  typeof fetchProductItemByIdParamsSchema
>;

export const removeProductItemByIdParamsSchema = schema.string();

export type removeProductItemByIdParams = schema.infer<
  typeof removeProductItemByIdParamsSchema
>;
