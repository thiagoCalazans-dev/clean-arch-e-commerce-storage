export interface CreateProductItemInputDTO {
  data: {
    productId: string;
    code: string;
    colorId: string;
    sizeId: string;
    price: number;
    descount: number;
  };
}
