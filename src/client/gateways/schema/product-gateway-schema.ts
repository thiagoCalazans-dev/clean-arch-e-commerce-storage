import schema from "@/client/lib/schema";
import {
  Product,
  CreateProduct,
  ProductSchema,
} from "../actions/product-actions-schema";

export type PostProductParams = {
  data: CreateProduct;
};

export type PutProductParams = {
  data: Product;
};

export type GetByIdParams = string;

export const GetByIdReponseSchema = schema
  .object({
    data: ProductSchema,
  })
  .nullable();

export type GetByIdReponse = schema.infer<typeof GetByIdReponseSchema>;
