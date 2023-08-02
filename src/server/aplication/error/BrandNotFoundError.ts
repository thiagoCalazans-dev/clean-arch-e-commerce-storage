export class BrandNotFoundError extends Error {
  constructor() {
    super("Category not found");
  }
}
