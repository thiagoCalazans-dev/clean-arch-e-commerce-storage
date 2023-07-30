import { Size } from "./size";
import { Product } from "./product";
import { Color } from "./color";

export interface Storage {
  id?: string;
  amount: number;
  price: number;
  descount: number;
  sizeId: string;
  size?: Size;
  productId: string;
  product?: Product;
  colorId: string;
  Color: Color;
}
