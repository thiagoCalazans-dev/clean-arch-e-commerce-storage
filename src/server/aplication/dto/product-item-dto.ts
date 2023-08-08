export interface CreateProductItemInputDTO {
  data: {
    productId: string;
    colorId: string;
    sizeId: string;
    price: number;
    descount: number;
  };
}
