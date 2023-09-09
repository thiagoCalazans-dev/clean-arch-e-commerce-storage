export class UrlAlreadyExistError extends Error {
  constructor() {
    super("Url already exist");
  }
}
