import schema from "@/client/lib/schema";
import { Brand, CreateBrand } from "../actions/brand-actions-schema";

export type PostBrandParams = {
  data: CreateBrand;
};

export type PutBrandParams = {
  data: Brand;
};

export type GetByIdParams = string;

export const GetByIdReponseSchema = schema
  .object({
    data: schema.object({
      id: schema.string().uuid(),
      name: schema.string(),
      updatedAt: schema.string(),
      createdAt: schema.string(),
    }),
  })
  .nullable();

export type GetByIdReponse = schema.infer<typeof GetByIdReponseSchema>;
