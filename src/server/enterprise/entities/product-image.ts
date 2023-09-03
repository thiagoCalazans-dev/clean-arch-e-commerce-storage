import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface ProductImageProps {
  url: string;
  productItemId: string;
}

export class ProductImage {
  readonly productItemId: string;
  readonly url: string;

  constructor(private props: ProductImageProps, readonly id?: string) {
    this.id = id ?? randomUUID();

    if (props.productItemId.length < 1)
      throw new IsRequiredError("productItemId");
    this.productItemId = props.productItemId;

    if (props.url.length < 1) throw new IsRequiredError("size");
    this.url = props.url;
  }
}
