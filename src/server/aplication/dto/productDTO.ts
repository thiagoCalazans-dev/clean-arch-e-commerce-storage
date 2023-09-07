import { Product } from "@/server/enterprise/entities/product";

export interface CreateProductInputDTO {
  data: {
    name: string;
    brandId: string;
    categoryId: string;
    cost: number;
    description: string;
    trending: boolean;
  };
}

export interface ProductInputDTO {
  data: {
    name: string;
    brandId: string;
    categoryId: string;
    cost: number;
    description: string;
    trending: boolean;
  };
}

export interface UpdateProductInputDTO {
  data: {
    name: string;
    brandId: string;
    categoryId: string;
    cost: number;
    description: string;
    trending: boolean;
  };
}

export interface GetProductsOutputDTO {
  data: Product[];
}

export interface RemoveProductInputDTO {
  data: {
    id: string;
    name: string;
    value: string;
  };
}
