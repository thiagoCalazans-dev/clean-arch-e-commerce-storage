export class isCurrencyTypeValueError extends Error {
  constructor() {
    super(
      `cost needs to attend a curency type value: must be positive and with a maximum of two decimal places`
    );
  }
}
