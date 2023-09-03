export class ProductItemNotFoundError extends Error {
  constructor() {
    super("Product item not found");
  }
}
