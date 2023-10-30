import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { Currency } from "../value-object/currency";

interface EntryStockProps {
  productItemId: string;
  date: Date;
  value: number;
  quantity: number;
}

export class EntryStock {
  readonly id?: string;
  readonly productItemId: string;
  readonly date: Date;
  readonly value: number;
  readonly quantity: number;

  constructor(props: EntryStockProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.productItemId.length < 1)
      throw new IsRequiredError("productItemId");
    this.productItemId = props.productItemId;

    if (!props.date) throw new IsRequiredError("date");
    this.date = props.date;

    if (props.quantity < 0) throw new IsRequiredError("quantity");

    this.quantity = props.quantity;

    this.value = Currency.validate(props.value);
    this.value = props.value;
  }
}
