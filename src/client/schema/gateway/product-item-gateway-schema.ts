import schema from "@/client/lib/schema";
import {
  CreateProductItem,
  ProductItem,
  ProductItemSchema,
} from "../actions/product-item-actions-schema";

export type PostProductParams = {
  data: CreateProductItem;
};

export type PutProductParams = {
  data: ProductItem;
};

export type GetByIdParams = string;

export type GetParams = {
  productId: string;
};

export const GetByIdReponseSchema = schema
  .object({
    data: ProductItemSchema,
  })
  .nullable();

export type GetByIdReponse = schema.infer<typeof GetByIdReponseSchema>;
