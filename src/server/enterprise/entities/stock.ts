import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface StockProps {
  productItemId: string;
  quantity: number;
}

export class Stock {
  readonly id: string;
  readonly productItemId: string;
  readonly quantity: number;

  constructor(props: StockProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.productItemId.length < 1)
      throw new IsRequiredError("productItemId");
    this.productItemId = props.productItemId;

    if (props.quantity < 0) throw new IsRequiredError("quantity");

    this.quantity = props.quantity;
  }
}
