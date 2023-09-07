import { randomUUID } from "node:crypto";
import { IsRequiredError } from "../errors/isRequiredError";

interface SizeProps {
  name: string;
  value: string;
}

export class Size {
  readonly id: string;
  readonly name: string;
  readonly value: string;

  constructor(props: SizeProps, id?: string) {
    this.id = id ?? randomUUID();

    if (props.name.length <= 1) throw new IsRequiredError("name");

    this.name = props.name;

    if (props.value.length < 1) throw new IsRequiredError("value");

    this.value = props.value.toUpperCase();
  }
}
