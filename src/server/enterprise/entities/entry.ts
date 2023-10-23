import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { Currency } from "../value-object/currency";
import { isPercentageError } from "../errors/isPercentageError";

export interface EntryProps {
  productId: string;
  code: string;
  sizeId: string;
  colorId: string;
  price: number;
  descount?: number;
  quantity: number;
}

export class Entry {
  readonly id: string;
  readonly productId: string;
  readonly code: string;
  readonly sizeId: string;
  readonly colorId: string;
  readonly price: number;
  readonly descount: number;
  readonly quantity: number;

  constructor(props: EntryProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.productId.length < 1) throw new IsRequiredError("name");
    this.productId = props.productId;

    if (props.code.length < 1) throw new IsRequiredError("code");
    this.code = props.code;

    if (props.sizeId.length < 1) throw new IsRequiredError("size");
    this.sizeId = props.sizeId;

    if (props.colorId.length < 1) throw new IsRequiredError("color");
    this.colorId = props.colorId;

    if (props.quantity < 1) throw new IsRequiredError("quantity");
    this.quantity = props.quantity;

    this.price = Currency.validate(props.price);

    if (
      (props.descount && props.descount < 0) ||
      (props.descount && props.descount > 100)
    )
      throw new isPercentageError();
    this.descount = props.descount || 0;
  }
}
