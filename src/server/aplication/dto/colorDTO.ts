import { Color } from "@/server/enterprise/entities/color";

export interface CreateColorInputDTO {
  data: {
    name: string;
    value: string;
  };
}

export interface UpdateColorInputDTO {
  data: {
    name: string;
    value: string;
  };
}

export interface FetchCategoriesOutputDTO {
  data: Color[];
}

export interface RemoveColorInputDTO {
  data: {
    id: string;
    name: string;
    value: string;
  };
}
