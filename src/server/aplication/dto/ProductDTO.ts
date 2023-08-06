import { Product } from "@/server/enterprise/entities/product";

export interface CreateProductInputDTO {
  data: {
    name: string;
    brandId: string;
    categoryId: string;
    code: string;
    cost: number;
    description: string;
    trending: boolean;
  };
}

export interface CreateProductOutputDTO {
  data: {
    id: string;
    name: string;
    value: string;
  };
}

export interface UpdateProductInputDTO {
  data: {
    name: string;
    value: string;
  };
}

export interface FetchCategoriesOutputDTO {
  data: Product[];
}

export interface RemoveProductInputDTO {
  data: {
    id: string;
    name: string;
    value: string;
  };
}
