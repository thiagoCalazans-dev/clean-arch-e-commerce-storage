import {
  Color,
  ColorSchema,
  CreateColor,
  CreateColorSchema,
  fetchColorByIdParamsSchema,
  removeColorByIdParams,
  removeColorByIdParamsSchema,
} from "./schema/color-actions-schema";
import { ColorHttp } from "../gateways/colors-http";

const colorHttp = new ColorHttp();

async function getAll() {
  return colorHttp.Get();
}

async function fetchById(colorId: string) {
  const parsedParams = fetchColorByIdParamsSchema.safeParse(colorId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  return await colorHttp.GetById(parsedParams.data);
}

async function update(color: Color) {
  const parsedParams = ColorSchema.safeParse(color);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: color,
  };

  await colorHttp.Put(body);
}

async function create(color: CreateColor) {
  const parsedParams = CreateColorSchema.safeParse(color);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: color,
  };

  await colorHttp.Post(body);
}

async function remove(colorId: removeColorByIdParams) {
  const parsedParams = removeColorByIdParamsSchema.safeParse(colorId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await colorHttp.Delete(colorId);
}

export const ColorActions = {
  create,
  getAll,
  fetchById,
  remove,
  update,
};
