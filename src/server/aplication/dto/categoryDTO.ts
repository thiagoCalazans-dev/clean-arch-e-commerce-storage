import { Category } from "@/server/enterprise/entities/category";

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

export interface UpdateCategoryInputDTO {
  data: {
    name: string;
  };
}

export interface FetchCategoriesOutputDTO {
  data: Category[];
}

export interface RemoveCategoryInputDTO {
  data: {
    id: string;
    name: string;
  };
}
