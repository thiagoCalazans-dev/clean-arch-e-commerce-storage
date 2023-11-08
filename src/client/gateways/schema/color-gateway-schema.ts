import schema from "@/client/lib/schema";
import {
  Color,
  CreateColor,
} from "@/client/actions/schema/color-actions-schema";

export type PostColorParams = {
  data: CreateColor;
};

export type PutColorParams = {
  data: Color;
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
