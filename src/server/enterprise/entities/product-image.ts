import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface ProductImageProps {
  imageUrl: string;
  productItemId: string;
}

export class ProductImage {
  readonly productItemId: string;
  readonly imageUrl: string;

  constructor(private props: ProductImageProps, readonly id?: string) {
    this.id = id ?? randomUUID();

    if (props.productItemId.length < 1)
      throw new IsRequiredError("productItemId");
    this.productItemId = props.productItemId;

    if (props.imageUrl.length < 1) throw new IsRequiredError("size");
    this.imageUrl = props.imageUrl;
  }
}
