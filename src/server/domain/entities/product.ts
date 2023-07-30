import { Brand } from "./brand";
import { Category } from "./category";

export interface Product {
  id?: string;
  name: string;
  code: string;
  value: number;
  description: string;
  trending: boolean;
  categoryID: string;
  category?: Category;
  brandId: string;
  brand?: Brand;
}
