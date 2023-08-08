import { Size } from "./size";
import { Product } from "./product";
import { Color } from "./color";
import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";
import { Currency } from "../value-object/currency";
import { isPercentageError } from "../errors/isPercentageError";

export interface ProductItemProps {
  productId: string;
  sizeId: string;
  colorId: string;
  price: number;
  descount?: number;
}

export class ProductItem {
  private _id: string;
  private _productId: string;
  private _sizeId: string;
  private _colorId: string;
  private _price: number;
  private _descount: number;

  constructor(props: ProductItemProps, id?: string) {
    this._id = id ?? randomUUID();

    if (props.productId.length < 1) throw new IsRequiredError("name");
    this._productId = props.productId;

    if (props.sizeId.length < 1) throw new IsRequiredError("name");
    this._sizeId = props.sizeId;

    if (props.colorId.length < 1) throw new IsRequiredError("code");
    this._colorId = props.colorId;

    this._price = Currency.validate(props.price);

    if (
      (props.descount && props.descount < 0) ||
      (props.descount && props.descount > 100)
    )
      throw new isPercentageError();
    this._descount = props.descount || 0;
  }

  get id() {
    return this._id;
  }
  get productId() {
    return this._productId;
  }
  get sizeId() {
    return this._sizeId;
  }

  get colorId() {
    return this._colorId;
  }

  get price() {
    return this._price;
  }

  get descount() {
    return this._descount;
  }
}
