import {
  Brand,
  CreateBrand,
} from "@/client/actions/schema/brand-actions-schema";
import schema from "@/client/lib/schema";

export type PostBrandParams = {
  data: CreateBrand;
};

export type PutBrandParams = {
  data: Brand;
};
export type GetBrandsResponse = {
  data: Brand[];
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
