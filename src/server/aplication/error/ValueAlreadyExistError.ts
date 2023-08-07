export class ValueAlreadyExistError extends Error {
  constructor() {
    super("Value already exist");
  }
}
