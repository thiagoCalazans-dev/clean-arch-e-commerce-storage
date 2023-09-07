import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface BrandProps {
  name: string;
}

export class Brand {
  readonly id: string;
  readonly name: string;

  constructor(props: BrandProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this.name = props.name;
  }
}
