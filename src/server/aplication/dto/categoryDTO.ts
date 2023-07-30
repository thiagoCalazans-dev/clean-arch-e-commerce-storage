import { Category } from "@/server/domain/entities/category";

export interface CreateCategoryInputDTO {
  data: {
    name: string;
  };
}

export interface CreateCategoryOutputDTO {
  data: {
    id: string;
    name: string;
  };
}

export interface FetchCategoriesOutputDTO {
  data: Category[];
}
