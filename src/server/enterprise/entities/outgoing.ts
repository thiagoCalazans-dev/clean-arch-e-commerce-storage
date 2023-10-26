import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { isPercentageError } from "../errors/isPercentageError";

interface OutgoingProps {
  productItemId: string;
  date: Date;
  quantity: number;
  descount?: number;
}

export class Outgoing {
  readonly id?: string;
  readonly productItemId: string;
  readonly date: Date;
  readonly quantity: number;
  readonly descount?: number;

  constructor(props: OutgoingProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.productItemId.length < 1)
      throw new IsRequiredError("productItemId");
    this.productItemId = props.productItemId;

    if (!props.date) throw new IsRequiredError("date");
    this.date = props.date;

    if (props.quantity < 0) throw new IsRequiredError("quantity");

    this.quantity = props.quantity;

    if (
      (props.descount && props.descount < 0) ||
      (props.descount && props.descount > 100)
    )
      throw new isPercentageError();
    this.descount = props.descount || 0;
  }
}
