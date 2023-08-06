import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { isCurrencyTypeValueError } from "../errors/isCurrencyTypeValueError";
import { Currency } from "../value-objects/currency";

interface ProductProps {
  name: string;
  code: string;
  cost: number;
  description: string;
  trending?: boolean;
  categoryID: string;
  brandId: string;
}

export class Product {
  private _id: string;
  private _name: string;
  private _code: string;
  private _cost: Currency;
  private _description: string;
  private _trending: boolean;
  private _categoryId: string;
  private _brandId: string;

  constructor(props: ProductProps, id?: string) {
    this._id = id ?? randomUUID();

    if (props.name.length < 1) throw new IsRequiredError("name");
    this._name = props.name;

    if (props.code.length < 1) throw new IsRequiredError("code");
    this._code = props.code;

    if (props.description.length < 1) throw new IsRequiredError("description");
    this._description = props.description;

    if (props.categoryID.length < 1) throw new IsRequiredError("categoryID");
    this._categoryId = props.categoryID;

    if (props.brandId.length < 1) throw new IsRequiredError("brandId");
    this._brandId = props.brandId;

    this._cost = Currency.validateCurrencyType(props.cost);
    this._trending = props.trending || false;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }

  get description() {
    return this._description;
  }

  get trending() {
    return this._trending;
  }

  get brandId() {
    return this._brandId;
  }

  get categoryId() {
    return this._categoryId;
  }
}
