import schema from "@/client/lib/schema";
import { Size, CreateSize } from "@/client/actions/schema/size-actions-schema";

export type PostSizeParams = {
  data: CreateSize;
};

export type GetSize = {
  data: Size[];
};

export type PutSizeParams = {
  data: Size;
};

export type GetByIdParams = string;

export const GetByIdReponseSchema = schema
  .object({
    data: schema.object({
      id: schema.string().uuid(),
      name: schema.string(),
      value: schema.string(),
      updatedAt: schema.string(),
      createdAt: schema.string(),
    }),
  })
  .nullable();

export type GetByIdReponse = schema.infer<typeof GetByIdReponseSchema>;
