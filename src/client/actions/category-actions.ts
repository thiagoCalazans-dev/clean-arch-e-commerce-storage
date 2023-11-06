import {
  Category,
  CategorySchema,
  CreateCategory,
  CreateCategorySchema,
  fetchCategoryByIdParamsSchema,
  removeCategoryByIdParams,
  removeCategoryByIdParamsSchema,
} from "./schema/category-actions-schema";
import { CategoryHttp } from "../gateways/categories-http";

const categoryHttp = new CategoryHttp();

async function getAll() {
  return categoryHttp.Get();
}

async function fetchById(categoryId: string) {
  console.log(categoryId);

  const parsedParams = fetchCategoryByIdParamsSchema.safeParse(categoryId);

  if (!parsedParams.success) {
    console.log(parsedParams.error);
    return;
  }

  console.log(parsedParams.data);

  return await categoryHttp.GetById(parsedParams.data);
}

async function update(category: Category) {
  const parsedParams = CategorySchema.safeParse(category);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: category,
  };

  await categoryHttp.Put(body);
}

async function create(category: CreateCategory) {
  const parsedParams = CreateCategorySchema.safeParse(category);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  const body = {
    data: category,
  };

  await categoryHttp.Post(body);
}

async function remove(categoryId: removeCategoryByIdParams) {
  const parsedParams = removeCategoryByIdParamsSchema.safeParse(categoryId);

  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message);
  }

  await categoryHttp.Delete(categoryId);
}

export const CategoryActions = {
  create,
  getAll,
  fetchById,
  remove,
  update,
};
