export interface CreateEntryInputDTO {
  data: {
    productId: string;
    code: string;
    colorId: string;
    sizeId: string;
    price: number;
    descount: number;
    quantity: number;
  };
}
