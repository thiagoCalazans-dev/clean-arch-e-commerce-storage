export class IsRequiredError extends Error {
  constructor(private value: string) {
    super(`${value} is required`);
  }
}
