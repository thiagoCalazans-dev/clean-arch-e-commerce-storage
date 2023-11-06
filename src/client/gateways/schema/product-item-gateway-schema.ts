import {
  CreateProductItem,
  ProductItem,
  ProductItemSchema,
} from "@/client/actions/schema/product-item-actions-schema";
import schema from "@/client/lib/schema";

export type PostProductParams = {
  data: CreateProductItem;
};

export type PutProductParams = {
  data: ProductItem;
};

export type GetByIdParams = {
  productId: string;
  productItemId: string;
};

export type GetParams = {
  productId: string;
};

export const GetByIdReponseSchema = schema
  .object({
    data: ProductItemSchema,
  })
  .nullable();

export type GetByIdReponse = schema.infer<typeof GetByIdReponseSchema>;
