export class CodeAlreadyExistError extends Error {
  constructor() {
    super("Code already exist");
  }
}
