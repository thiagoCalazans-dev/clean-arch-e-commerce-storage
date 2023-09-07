import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";
import { Currency } from "../value-object/currency";

interface ProductProps {
  name: string;
  cost: number;
  description: string;
  trending?: boolean;
  categoryId: string;
  brandId: string;
}

export class Product {
  readonly id: string;
  readonly name: string;
  readonly cost: number;
  readonly description: string;
  readonly trending: boolean;
  readonly categoryId: string;
  readonly brandId: string;

  constructor(props: ProductProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length < 1) throw new IsRequiredError("name");
    this.name = props.name;

    if (props.description.length < 1) throw new IsRequiredError("description");
    this.description = props.description;

    if (props.categoryId.length < 1) throw new IsRequiredError("categoryID");
    this.categoryId = props.categoryId;

    if (props.brandId.length < 1) throw new IsRequiredError("brandId");
    this.brandId = props.brandId;

    this.cost = Currency.validate(props.cost);
    this.trending = props.trending || false;
  }
}
