export class NameAlreadyExistError extends Error {
  constructor() {
    super("Name already exist");
  }
}
