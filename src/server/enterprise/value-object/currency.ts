import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";

export class Currency {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static validate(value: number) {
    if (value < 0) {
      throw new isCurrencyTypeValueError();
    }

    const numberOfDecimalPlaces = (value.toString().split(".")[1] || "").length;

    if (numberOfDecimalPlaces > 2) {
      throw new isCurrencyTypeValueError();
    }

    return new Currency(value).value;
  }
}
