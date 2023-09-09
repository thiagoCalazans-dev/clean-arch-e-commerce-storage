import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface ImageProps {
  name: string;
  url: string;
}

export class Image {
  readonly id: string;
  readonly name: string;
  readonly url: string;

  constructor(props: ImageProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this.name = props.name;

    if (props.url.length <= 1) throw new IsRequiredError("url");

    this.url = props.url;
  }
}
