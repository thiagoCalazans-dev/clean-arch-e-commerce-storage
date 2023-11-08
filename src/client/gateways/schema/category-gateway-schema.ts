import schema from "@/client/lib/schema";
import { Category, CreateCategory } from "@/client/actions/schema/category-actions-schema";

export type PostCategoryParams = {
  data: CreateCategory;
};

export type PutCategoryParams = {
  data: Category;
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
