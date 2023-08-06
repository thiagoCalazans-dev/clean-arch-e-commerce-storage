import { Size } from "@/server/domain/entities/size";

export interface CreateSizeInputDTO {
  data: {
    name: string;
    value: string;
  };
}

export interface CreateSizeOutputDTO {
  data: {
    id: string;
    name: string;
    value: string;
  };
}

export interface UpdateSizeInputDTO {
  data: {
    name: string;
    value: string;
  };
}

export interface FetchCategoriesOutputDTO {
  data: Size[];
}

export interface RemoveSizeInputDTO {
  data: {
    id: string;
    name: string;
    value: string;
  };
}
