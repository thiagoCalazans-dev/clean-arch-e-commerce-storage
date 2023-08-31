import { ProductItemHttp } from "../gateways/products-item-http";

const productItemHttp = new ProductItemHttp();

async function fetchItemsByProduct(productId: string) {
  return productItemHttp.Get(productId);
}

export const ProductItemActions = {
  fetchItemsByProduct,
};
