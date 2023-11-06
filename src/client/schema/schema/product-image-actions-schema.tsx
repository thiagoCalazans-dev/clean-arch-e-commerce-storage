import schema from "../../schema";
import { BrandSchema } from "./brand-actions-schema";
import { CategorySchema } from "./category-actions-schema";

export const ProductImageSchema = schema.object({
  id: schema.string(),
  productId: schema.string(),
  imageUrl: schema.string(),
});

export type ProductImage = schema.infer<typeof ProductImageSchema>;

export const CreateProductImageSchema = schema.object({
  productItemId: schema.string(),
  imageUrl: schema.string(),
});

export type CreateProductImage = schema.infer<typeof CreateProductImageSchema>;

export const fetchProductImageByIdParamsSchema = schema.string();

export type fetchProductImageByIdParams = schema.infer<
  typeof fetchProductImageByIdParamsSchema
>;

export const removeProductImageByIdParamsSchema = schema.string();

export type removeProductImageByIdParams = schema.infer<
  typeof removeProductImageByIdParamsSchema
>;
