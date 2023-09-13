export class ProductImageAlreadyExistError extends Error {
  constructor() {
    super("Product Image already exist");
  }
}
