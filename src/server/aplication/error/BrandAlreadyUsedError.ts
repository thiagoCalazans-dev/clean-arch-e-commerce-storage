export class BrandAlreadyUsedError extends Error {
  constructor() {
    super("Brand already used");
  }
}
