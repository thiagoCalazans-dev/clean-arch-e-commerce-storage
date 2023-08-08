export class isPercentageError extends Error {
  constructor() {
    super(`descont needs to be a number between 0 and 100`);
  }
}
