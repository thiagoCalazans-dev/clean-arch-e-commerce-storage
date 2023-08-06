import { Brand } from "@/server/domain/entities/brand";

export interface CreateBrandInputDTO {
  data: {
    name: string;
  };
}

export interface CreateBrandOutputDTO {
  data: {
    id: string;
    name: string;
  };
}

export interface UpdateBrandInputDTO {
  data: {
    name: string;
  };
}

export interface FetchCategoriesOutputDTO {
  data: Brand[];
}

export interface RemoveBrandInputDTO {
  data: {
    id: string;
    name: string;
  };
}
