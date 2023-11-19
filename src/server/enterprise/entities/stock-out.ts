import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { Currency } from "../value-object/currency";

export interface StockOutProps {
  productItemId: string;
  date: Date;
  price: number;
  discount?: number;
  quantity: number;
}

export class StockOut {
  readonly id?: string;
  readonly productItemId: string;
  readonly date: Date;
  readonly price: number;
  readonly discount: number = 0;
  readonly quantity: number;

  constructor(props: StockOutProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.productItemId.length < 1)
      throw new IsRequiredError("productItemId");
    this.productItemId = props.productItemId;

    if (!props.date) throw new IsRequiredError("date");
    this.date = props.date;
    this.price = Currency.validate(props.price);

    if (props.discount) this.discount = Currency.validate(props.discount);

    this.quantity = props.quantity;
  }
}
